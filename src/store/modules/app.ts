import type { Module } from "vuex";
import { AppMutationTypes } from "@/store/mutation-types";
import registryService from "@/services/RegistryService";

interface AppState {
  isAuthorized: boolean;
  isSetupInProgress: boolean;
  isLoginInProgress: boolean;
  isLogoutInProgress: boolean;
}

const getDefaultState = (): AppState => ({
  isAuthorized: false,
  isSetupInProgress: true,
  isLoginInProgress: false,
  isLogoutInProgress: false,
});

export default {
  state: getDefaultState(),

  getters: {
    isAuthorized: (state: AppState): boolean => state.isAuthorized,
    isAppSetupInProgress: (state: AppState): boolean => state.isSetupInProgress,
    isLoginInProgress: (state: AppState): boolean => state.isLoginInProgress,
    isLogoutInProgress: (state: AppState): boolean => state.isLogoutInProgress,
  },

  actions: {
    async login({ commit }): Promise<void> {
      commit(AppMutationTypes.SET_LOG_IN_LOADING_STATE, true);

      try {
        await registryService.querySetValue("is_authorized", "true", false);
        commit(AppMutationTypes.SET_AUTHORIZED, true);
      } finally {
        commit(AppMutationTypes.SET_LOG_IN_LOADING_STATE, false);
      }
    },

    async logout({ commit, dispatch }): Promise<void> {
      commit(AppMutationTypes.SET_LOG_OUT_LOADING_STATE, true);

      try {
        await registryService.querySetValue("is_authorized", "false", false);
        commit(AppMutationTypes.SET_AUTHORIZED, false);
        await dispatch("resetStates");
      } finally {
        commit(AppMutationTypes.SET_LOG_OUT_LOADING_STATE, false);
      }
    },

    async setupApp({ commit }): Promise<void> {
      const registryValue = await registryService.queryValue("is_authorized");
      if (registryValue && registryValue.value === "true") {
        commit(AppMutationTypes.SET_AUTHORIZED, true);
      }
      commit(AppMutationTypes.SET_SETUP_IN_PROGRESS_STATE, false);
    },

    async resetStates({ dispatch }): Promise<void> {
      await Promise.allSettled([
        dispatch("resetNodeState"),
        dispatch("resetQuotaState"),
        dispatch("resetSubscriptionState"),
        dispatch("resetSettingsState"),
        dispatch("resetWalletState"),
      ]);
    },
  },

  mutations: {
    [AppMutationTypes.SET_SETUP_IN_PROGRESS_STATE](
      state,
      value: boolean
    ): void {
      state.isSetupInProgress = value;
    },

    [AppMutationTypes.SET_AUTHORIZED](state, value: boolean): void {
      state.isAuthorized = value;
    },

    [AppMutationTypes.SET_LOG_IN_LOADING_STATE](state, value: boolean): void {
      state.isLoginInProgress = value;
    },

    [AppMutationTypes.SET_LOG_OUT_LOADING_STATE](state, value: boolean): void {
      state.isLogoutInProgress = value;
    },
  },
} as Module<AppState, any>;
