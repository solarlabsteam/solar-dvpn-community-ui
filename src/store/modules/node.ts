import type { Module } from "vuex";
import { NodeMutationTypes } from "@/store/mutation-types";
import { type Node, NodeSelectionStatus, NodeStatus } from "@/types";
import connectionService from "@/services/ConnectionService";
import nodeService from "@/services/NodeService";

interface NodeState {
  selectedNode?: Node;
  isDefaultNodeLoading: boolean;
}

const getDefaultState = (): NodeState => ({
  selectedNode: undefined,
  isDefaultNodeLoading: false,
});

export default {
  state: getDefaultState(),

  getters: {
    selectedNode: (state): Node | undefined => state.selectedNode,
    isDefaultNodeLoading: (state): boolean => state.isDefaultNodeLoading,
  },

  actions: {
    selectNode({ commit }, node: Node): void {
      commit(NodeMutationTypes.SET_SELECTED_NODE, node);
    },

    async selectNodeChecked(
      { commit, dispatch, getters },
      node: Node
    ): Promise<NodeSelectionStatus> {
      await dispatch("setConnectionLoadingState", true);
      try {
        let status = NodeSelectionStatus.SUCCESS;

        const subscribedNodesAddresses = getters.subscribedNodes.map(
          (node: Node) => node.blockchainAddress
        );

        if (!subscribedNodesAddresses.includes(node.blockchainAddress)) {
          status = NodeSelectionStatus.SUBSCRIPTION_REQUIRED;
        }

        switch (status) {
          case NodeSelectionStatus.SUCCESS:
            await Promise.allSettled([
              dispatch("clearSelectedNode"),
              dispatch("clearQuota"),
            ]);
            commit(NodeMutationTypes.SET_SELECTED_NODE, node);
            return NodeSelectionStatus.SUCCESS;
          default:
            return status;
        }
      } finally {
        await dispatch("setConnectionLoadingState", false);
      }
    },

    clearSelectedNode({ commit }): void {
      commit(NodeMutationTypes.CLEAR_SELECTED_NODE);
    },

    async selectDefaultNode({ dispatch, commit, getters }): Promise<void> {
      try {
        commit(NodeMutationTypes.SET_DEFAULT_NODE_LOADING_STATE, true);

        await Promise.allSettled([
          dispatch("fetchSubscribedNodes"),
          dispatch("fetchNodes", {}),
        ]);

        let node: Node;

        const connection = await connectionService.queryNodeConnection();
        const isConnected = connection.tunnelStatus === "connected";
        if (isConnected) {
          node = (
            await nodeService.querySubscribedNodes([connection.nodeAddress])
          ).items[0];
        } else {
          const activeSubscribedNodes = getters.subscribedNodes.filter(
            (node: Node) => node.status === NodeStatus.active
          );
          const defaultSubscribedNode =
            activeSubscribedNodes.length > 0 ? activeSubscribedNodes[0] : null;
          const defaultAvailableNode =
            getters.nodes.length > 0
              ? getters.nodes.find((node: Node) => node.isTrusted) ||
                getters.nodes[0]
              : null;
          node = defaultSubscribedNode || defaultAvailableNode;
        }
        await dispatch("selectNode", node);
        await dispatch("setConnectionState", isConnected);
      } finally {
        commit(NodeMutationTypes.SET_DEFAULT_NODE_LOADING_STATE, false);
      }
    },

    async resetNodeState({ commit }): Promise<void> {
      commit(NodeMutationTypes.RESET_NODE_STATE);
    },
  },

  mutations: {
    [NodeMutationTypes.SET_SELECTED_NODE](state, payload: Node): void {
      state.selectedNode = payload;
    },

    [NodeMutationTypes.CLEAR_SELECTED_NODE](state): void {
      state.selectedNode = getDefaultState().selectedNode;
    },

    [NodeMutationTypes.SET_DEFAULT_NODE_LOADING_STATE](
      state,
      value: boolean
    ): void {
      state.isDefaultNodeLoading = value;
    },

    [NodeMutationTypes.RESET_NODE_STATE](state): void {
      Object.assign(state, getDefaultState());
    },
  },
} as Module<NodeState, any>;
