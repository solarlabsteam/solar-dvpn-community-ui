import type { Module } from "vuex";
import { ConnectionMutationTypes } from "@/store/mutation-types";
import connectionService from "@/services/ConnectionService";

interface ConnectionState {
  isConnectionLoading: boolean;
  isConnected: boolean;
}

const getDefaultState = (): ConnectionState => ({
  isConnectionLoading: false,
  isConnected: false,
});

export default {
  state: getDefaultState(),

  getters: {
    isConnectionLoading: (state: ConnectionState): boolean =>
      state.isConnectionLoading,
    isConnected: (state: ConnectionState): boolean => state.isConnected,
  },

  actions: {
    async connectToNode({ commit, dispatch, getters }): Promise<void> {
      commit(ConnectionMutationTypes.SET_CONNECTION_LOADING_STATE, true);

      try {
        await connectionService.queryConnectToNode(
          getters.selectedNode.blockchainAddress
        );
        dispatch("setConnectedNode", getters.selectedNode);
        commit(ConnectionMutationTypes.SET_CONNECTION_STATE, true);
      } finally {
        commit(ConnectionMutationTypes.SET_CONNECTION_LOADING_STATE, false);
      }
    },

    async disconnectFromNode({ commit, dispatch }): Promise<void> {
      commit(ConnectionMutationTypes.SET_CONNECTION_LOADING_STATE, true);

      try {
        await connectionService.queryDisconnectFromNode();
        dispatch("clearConnectedNode");
        commit(ConnectionMutationTypes.SET_CONNECTION_STATE, false);
      } finally {
        commit(ConnectionMutationTypes.SET_CONNECTION_LOADING_STATE, false);
      }
    },

    async stopSessions({ commit, dispatch }): Promise<void> {
      try {
        await connectionService.queryStopSessions();
      } finally {

      }
    },

    async resetConfiguration({ commit, dispatch }): Promise<void> {
      try {
        await connectionService.queryResetConfiguration();
      } finally {

      }
    },

    setConnectionLoadingState({ commit }, value): void {
      commit(ConnectionMutationTypes.SET_CONNECTION_LOADING_STATE, value);
    },
  },

  mutations: {
    [ConnectionMutationTypes.SET_CONNECTION_LOADING_STATE](
      state,
      value: boolean
    ): void {
      state.isConnectionLoading = value;
    },
    [ConnectionMutationTypes.SET_CONNECTION_STATE](
      state,
      value: boolean
    ): void {
      state.isConnected = value;
    },
  },
} as Module<ConnectionState, any>;
