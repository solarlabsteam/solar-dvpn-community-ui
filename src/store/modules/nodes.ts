import type { Module } from "vuex";
import { NodesMutationTypes } from "@/store/mutation-types";
import type {
  ContinentsInfo,
  Node,
  NodesData,
  NodesSearchParameters,
  Pagination,
} from "@/types";
import nodeService from "@/services/NodeService";
import subscriptionService from "@/services/SubscriptionService";

interface NodesState {
  continents: ContinentsInfo;
  nodes: Node[];
  nodesPagination?: Pagination;
  isNodesLoading: boolean;
  isNodesLoadingFailed: boolean;
  subscribedNodes: Node[];
  subscribedNodesPagination?: Pagination;
  isSubscribedNodesLoading: boolean;
  isSubscribedNodesLoadingFailed: boolean;
}

const getDefaultState = (): NodesState => ({
  continents: {
    countries: [],
    continentsNodesCount: { EU: 0, AS: 0, AF: 0, NA: 0, SA: 0, RW: 0 },
  },
  nodes: [],
  nodesPagination: undefined,
  isNodesLoading: false,
  isNodesLoadingFailed: false,
  subscribedNodes: [],
  subscribedNodesPagination: undefined,
  isSubscribedNodesLoading: false,
  isSubscribedNodesLoadingFailed: false,
});

export default {
  state: getDefaultState(),

  getters: {
    continents: (state): ContinentsInfo => state.continents,
    nodes: (state): Node[] => state.nodes,
    isNodesLoading: (state): boolean => state.isNodesLoading,
    isNodesLoadingFailed: (state): boolean => state.isNodesLoadingFailed,
    subscribedNodes: (state): Node[] => state.subscribedNodes,
    isSubscribedNodesLoading: (state): boolean =>
      state.isSubscribedNodesLoading,
    isSubscribedNodesLoadingFailed: (state): boolean =>
      state.isSubscribedNodesLoadingFailed,
    isMoreNodesAvailable: (state): boolean =>
      state.nodesPagination !== undefined &&
      state.nodesPagination.currentPage <
        Math.ceil(state.nodesPagination.total / 100),
    isMoreSubscribedNodesAvailable: (state): boolean =>
      state.subscribedNodesPagination !== undefined &&
      state.subscribedNodesPagination.currentPage <
        Math.ceil(state.subscribedNodesPagination.total / 100),
  },

  actions: {
    async fetchContinents({ commit }): Promise<void> {
      commit(NodesMutationTypes.SET_NODES_LOADING_FAILED_STATE, false);
      commit(NodesMutationTypes.SET_NODES_LOADING_STATE, true);

      try {
        const data = await nodeService.queryContinentsInfos();
        commit(NodesMutationTypes.SET_CONTINENTS, data);
      } catch (e) {
        commit(NodesMutationTypes.SET_NODES_LOADING_FAILED_STATE, true);
        throw e;
      } finally {
        commit(NodesMutationTypes.SET_NODES_LOADING_STATE, false);
      }
    },

    async fetchNodes(
      { commit },
      payload: NodesSearchParameters
    ): Promise<void> {
      commit(NodesMutationTypes.SET_NODES_LOADING_FAILED_STATE, false);
      commit(NodesMutationTypes.SET_NODES_LOADING_STATE, true);
      commit(NodesMutationTypes.SET_NODES, []);
      try {
        const data = await nodeService.queryActiveNodes(payload);
        commit(NodesMutationTypes.SET_NODES, data.items);
        commit(NodesMutationTypes.SET_NODES_PAGINATION, data.pagination);
      } catch (e) {
        commit(NodesMutationTypes.SET_NODES_LOADING_FAILED_STATE, true);
        throw e;
      } finally {
        commit(NodesMutationTypes.SET_NODES_LOADING_STATE, false);
      }
    },

    async fetchMoreNodes(
      { commit, state },
      payload: NodesSearchParameters
    ): Promise<void> {
      commit(NodesMutationTypes.SET_NODES_LOADING_FAILED_STATE, false);
      commit(NodesMutationTypes.SET_NODES_LOADING_STATE, true);
      try {
        const data: NodesData = await nodeService.queryActiveNodes({
          ...payload,
          page: state.nodesPagination!.currentPage + 1,
        });
        commit(NodesMutationTypes.SET_NODES, [...state.nodes, ...data.items]);
        commit(NodesMutationTypes.SET_NODES_PAGINATION, data.pagination);
      } catch (e) {
        commit(NodesMutationTypes.SET_NODES_LOADING_FAILED_STATE, true);
        throw e;
      } finally {
        commit(NodesMutationTypes.SET_NODES_LOADING_STATE, false);
      }
    },

    async fetchSubscribedNodes({ commit }): Promise<void> {
      commit(
        NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_FAILED_STATE,
        false
      );
      commit(NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_STATE, true);

      try {
        const subscribedNodesAddresses =
          await subscriptionService.querySubscriptionsNodesAddresses();
        const data: NodesData = await nodeService.querySubscribedNodes(
          subscribedNodesAddresses,
          1
        );
        commit(NodesMutationTypes.SET_SUBSCRIBED_NODES, data.items);
        commit(
          NodesMutationTypes.SET_SUBSCRIBED_NODES_PAGINATION,
          data.pagination
        );
      } catch (e) {
        commit(
          NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_FAILED_STATE,
          true
        );
        throw e;
      } finally {
        commit(NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_STATE, false);
      }
    },

    async fetchMoreSubscribedNodes({ commit, state }): Promise<void> {
      commit(
        NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_FAILED_STATE,
        false
      );
      commit(NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_STATE, true);

      try {
        const subscribedNodesAddresses =
          await subscriptionService.querySubscriptionsNodesAddresses();
        const data: NodesData = await nodeService.querySubscribedNodes(
          subscribedNodesAddresses,
          state.subscribedNodesPagination!.currentPage + 1
        );
        commit(NodesMutationTypes.SET_SUBSCRIBED_NODES, [
          ...state.subscribedNodes,
          ...data.items,
        ]);
        commit(
          NodesMutationTypes.SET_SUBSCRIBED_NODES_PAGINATION,
          data.pagination
        );
      } catch (e) {
        commit(
          NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_FAILED_STATE,
          true
        );
        throw e;
      } finally {
        commit(NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_STATE, false);
      }
    },
  },

  mutations: {
    [NodesMutationTypes.SET_CONTINENTS](state, payload: ContinentsInfo): void {
      state.continents = payload;
    },

    [NodesMutationTypes.SET_NODES](state, payload: Node[]): void {
      state.nodes = payload;
    },

    [NodesMutationTypes.SET_NODES_PAGINATION](
      state,
      payload: Pagination
    ): void {
      state.nodesPagination = payload;
    },

    [NodesMutationTypes.SET_NODES_LOADING_STATE](state, value: boolean): void {
      state.isNodesLoading = value;
    },

    [NodesMutationTypes.SET_NODES_LOADING_FAILED_STATE](
      state,
      value: boolean
    ): void {
      state.isNodesLoadingFailed = value;
    },

    [NodesMutationTypes.SET_SUBSCRIBED_NODES](state, payload: Node[]): void {
      state.subscribedNodes = payload;
    },

    [NodesMutationTypes.SET_SUBSCRIBED_NODES_PAGINATION](
      state,
      payload: Pagination
    ): void {
      state.subscribedNodesPagination = payload;
    },

    [NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_STATE](
      state,
      value: boolean
    ): void {
      state.isSubscribedNodesLoading = value;
    },

    [NodesMutationTypes.SET_SUBSCRIBED_NODES_LOADING_FAILED_STATE](
      state,
      value: boolean
    ): void {
      state.isSubscribedNodesLoadingFailed = value;
    },
  },
} as Module<NodesState, any>;
