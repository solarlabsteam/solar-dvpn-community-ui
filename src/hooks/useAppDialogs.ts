import useGlobalEmitter from "@/hooks/useGlobalEmitter";
import type { Node } from "@/types";

export default function useAppDialogs(): {
  openPurchaseModal(): void;
  openSubscriptionModal(node: Node): void;
  openUnsubscriptionModal(node: Node): void;
  openNodesFiltersModal(): void;
} {
  const emitter = useGlobalEmitter();

  const openSubscriptionModal = (node: Node): void => {
    emitter.$emit("open-subscription-modal", node);
  };

  const openUnsubscriptionModal = (node: Node): void => {
    emitter.$emit("open-unsubscription-modal", node);
  };

  const openPurchaseModal = (): void => {
    emitter.$emit("open-purchase-modal");
  };

  const openNodesFiltersModal = () => {
    emitter.$emit("open-nodes-filters-modal");
  };

  return {
    openPurchaseModal,
    openSubscriptionModal,
    openUnsubscriptionModal,
    openNodesFiltersModal,
  };
}
