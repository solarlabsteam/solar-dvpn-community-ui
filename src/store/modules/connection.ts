import type { Module } from "vuex";
import { ConnectionMutationTypes } from "@/store/mutation-types";
import connectionService from "@/services/ConnectionService";

interface ConnectionState {
  isConnectionLoading: boolean;
  isConnected: boolean;
  isStopSessionsInProgress: boolean;
  isResetConfigurationInProgress: boolean;
}

const getDefaultState = (): ConnectionState => ({
  isConnectionLoading: false,
  isConnected: false,
  isStopSessionsInProgress: false,
  isResetConfigurationInProgress: false,
});

export default {
  state: getDefaultState(),

  getters: {
    isConnectionLoading: (state: ConnectionState): boolean =>
      state.isConnectionLoading,
    isConnected: (state: ConnectionState): boolean => state.isConnected,
    isStopSessionsInProgress: (state: ConnectionState): boolean =>
      state.isStopSessionsInProgress,
    isResetConfigurationInProgress: (state: ConnectionState): boolean =>
      state.isResetConfigurationInProgress,
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

    async stopSessions({ commit }): Promise<void> {
      commit(ConnectionMutationTypes.SET_STOP_SESSIONS_LOADING_STATE, true);

      try {
        await connectionService.queryStopSessions();
      } finally {
        commit(ConnectionMutationTypes.SET_STOP_SESSIONS_LOADING_STATE, false);
      }
    },

    async resetConfiguration({ commit }): Promise<void> {
      commit(
        ConnectionMutationTypes.SET_RESET_CONFIGURATION_LOADING_STATE,
        true
      );

      try {
        await connectionService.queryResetConfiguration();
      } finally {
        commit(
          ConnectionMutationTypes.SET_RESET_CONFIGURATION_LOADING_STATE,
          false
        );
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

    [ConnectionMutationTypes.SET_STOP_SESSIONS_LOADING_STATE](
      state,
      value: boolean
    ): void {
      state.isStopSessionsInProgress = value;
    },

    [ConnectionMutationTypes.SET_RESET_CONFIGURATION_LOADING_STATE](
      state,
      value: boolean
    ): void {
      state.isResetConfigurationInProgress = value;
    },
  },
} as Module<ConnectionState, any>;
