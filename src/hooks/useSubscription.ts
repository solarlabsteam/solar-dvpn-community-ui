import { useStore } from "vuex";
import { type Node, NodeSubscriptionStatus } from "@/types";
import useAppDialogs from "@/hooks/useAppDialogs";

export default function useSubscription(): {
  subscribe(node: Node, gbsAmount: number): Promise<boolean>;
  unsubscribe(node: Node): Promise<void>;
} {
  const store = useStore();
  const { openTopUpModal } = useAppDialogs();

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
      openTopUpModal();
    }

    return status !== NodeSubscriptionStatus.CANCELED;
  };

  const unsubscribe = async (node: Node): Promise<void> => {
    await store.dispatch("unsubscribeFromNode", node);
  };

  return { subscribe, unsubscribe };
}
