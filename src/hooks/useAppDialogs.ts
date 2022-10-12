import useGlobalEmitter from "@/hooks/useGlobalEmitter";
import type { Node } from "@/types";

export default function useAppDialogs(): {
  openTopUpModal(): void;
  openSubscriptionModal(node: Node): void;
  openNodesFiltersModal(): void;
} {
  const emitter = useGlobalEmitter();

  const openSubscriptionModal = (node: Node): void => {
    emitter.$emit("open-subscription-modal", node);
  };

  const openTopUpModal = (): void => {
    emitter.$emit("open-top-up-modal");
  };

  const openNodesFiltersModal = () => {
    emitter.$emit("open-nodes-filters-modal");
  };

  return { openTopUpModal, openSubscriptionModal, openNodesFiltersModal };
}
