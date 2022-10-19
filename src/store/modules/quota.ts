import type { Module } from "vuex";
import { QuotaMutationTypes } from "@/store/mutation-types";
import type { Quota } from "@/types";
import subscriptionService from "@/services/SubscriptionService";

interface QuotaState {
  quota: Quota | undefined;
  isQuotaLoading: boolean;
}

const getDefaultState = (): QuotaState => ({
  quota: undefined,
  isQuotaLoading: false,
});

export default {
  state: getDefaultState(),

  getters: {
    quota: (state): Quota | undefined => state.quota,
    isQuotaLoading: (state): boolean => state.isQuotaLoading,
  },

  actions: {
    async fetchQuota({ commit, getters }): Promise<void> {
      commit(QuotaMutationTypes.SET_QUOTA_LOADING_STATE, true);

      try {
        const data: Quota = await subscriptionService.querySubscriptionQuota(
          getters.selectedNode.blockchainAddress
        );
        commit(QuotaMutationTypes.SET_QUOTA, data);
      } finally {
        commit(QuotaMutationTypes.SET_QUOTA_LOADING_STATE, false);
      }
    },

    resetQuotaState({ commit }): void {
      commit(QuotaMutationTypes.RESET_QUOTA_STATE);
    },
  },

  mutations: {
    [QuotaMutationTypes.SET_QUOTA](state, payload: Quota): void {
      state.quota = payload;
    },

    [QuotaMutationTypes.SET_QUOTA_LOADING_STATE](state, value: boolean): void {
      state.isQuotaLoading = value;
    },

    [QuotaMutationTypes.RESET_QUOTA_STATE](state): void {
      Object.assign(state, getDefaultState());
    },
  },
} as Module<QuotaState, any>;
