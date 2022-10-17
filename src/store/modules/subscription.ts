import type { Module } from "vuex";
import { SubscriptionMutationTypes } from "@/store/mutation-types";
import { type Amount, type Node, NodeSubscriptionStatus } from "@/types";
import subscriptionService from "@/services/SubscriptionService";

interface SubscriptionState {
  isSubscribingLoading: boolean;
  isUnsubscriptionLoading: boolean;
}

const getDefaultState = (): SubscriptionState => ({
  isSubscribingLoading: false,
  isUnsubscriptionLoading: false,
});

export default {
  state: getDefaultState(),

  getters: {
    isUnsubscriptionLoading: (state): boolean => state.isUnsubscriptionLoading,
    isSubscribingLoading: (state): boolean => state.isSubscribingLoading,
  },

  actions: {
    async subscribeToNode(
      { commit, dispatch },
      paymentInfo: { deposit: Amount; node: Node }
    ): Promise<NodeSubscriptionStatus> {
      commit(SubscriptionMutationTypes.SET_SUBSCRIBING_LOADING_STATE, true);

      try {
        const { node, deposit } = paymentInfo;
        await subscriptionService.querySubscribeToNode(
          node.blockchainAddress,
          deposit.amount,
          deposit.denom
        );
        const status = NodeSubscriptionStatus.SUCCESS;
        if (status === NodeSubscriptionStatus.SUCCESS) {
          await Promise.allSettled([
            dispatch("clearSelectedNode"),
            dispatch("clearQuota"),
            dispatch("fetchSubscribedNodes"),
          ]);
          await dispatch("selectNode", paymentInfo.node);
        }
        return status;
      } finally {
        commit(SubscriptionMutationTypes.SET_SUBSCRIBING_LOADING_STATE, false);
      }
    },

    async unsubscribeFromNode({ commit, dispatch }, node: Node): Promise<void> {
      commit(SubscriptionMutationTypes.SET_UNSUBSCRIPTION_LOADING_STATE, true);
      try {
        await subscriptionService.queryUnsubscribeFromNode(
          node.blockchainAddress
        );
        await dispatch("fetchSubscribedNodes");
      } catch (e) {
        dispatch("fetchSubscribedNodes");
      } finally {
        commit(
          SubscriptionMutationTypes.SET_UNSUBSCRIPTION_LOADING_STATE,
          false
        );
      }
    },

    resetSubscriptionState({ commit }): void {
      commit(SubscriptionMutationTypes.RESET_SUBSCRIPTION_STATE);
    },
  },

  mutations: {
    [SubscriptionMutationTypes.SET_SUBSCRIBING_LOADING_STATE](
      state,
      value
    ): void {
      state.isSubscribingLoading = value;
    },
    [SubscriptionMutationTypes.SET_UNSUBSCRIPTION_LOADING_STATE](
      state,
      value: boolean
    ): void {
      state.isUnsubscriptionLoading = value;
    },
    [SubscriptionMutationTypes.RESET_SUBSCRIPTION_STATE](state): void {
      Object.assign(state, getDefaultState());
    },
  },
} as Module<SubscriptionState, any>;
