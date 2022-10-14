import { useStore } from "vuex";
import { type Node, NodeSubscriptionStatus } from "@/types";
import useAppDialogs from "@/hooks/useAppDialogs";
import type { ComputedRef } from "vue";
import { computed } from "vue";

export default function useSubscription(): {
  isSubscribingLoading: ComputedRef<boolean>;
  isUnsubscriptionLoading: ComputedRef<boolean>;
  subscribe(node: Node, gbsAmount: number): Promise<boolean>;
  unsubscribe(node: Node): Promise<void>;
} {
  const store = useStore();
  const { openPurchaseModal } = useAppDialogs();

  const isSubscribingLoading = computed<boolean>(
    () => store.getters.isSubscribingLoading
  );
  const isUnsubscriptionLoading = computed<boolean>(
    () => store.getters.isUnsubscriptionLoading
  );

  const subscribe = async (node: Node, gbsAmount: number): Promise<boolean> => {
    const amountDeposit = gbsAmount * node.defaultPrice;

    const status: NodeSubscriptionStatus = await store.dispatch(
      "subscribeToNode",
      {
        deposit: { amount: amountDeposit.toString(), denom: "udvpn" },
        node: node,
      }
    );

    if (status === NodeSubscriptionStatus.NOT_ENOUGH_BALANCE) {
      openPurchaseModal();
    }

    return status !== NodeSubscriptionStatus.CANCELED;
  };

  const unsubscribe = async (node: Node): Promise<void> => {
    await store.dispatch("unsubscribeFromNode", node);
  };

  return {
    isSubscribingLoading,
    isUnsubscriptionLoading,
    subscribe,
    unsubscribe,
  };
}
