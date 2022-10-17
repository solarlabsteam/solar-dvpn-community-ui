import type { ComputedRef } from "vue";
import type { ContinentsInfo, Node } from "@/types";
import { useStore } from "vuex";
import { computed } from "vue";

export default function useNodes(): {
  selectedNode: ComputedRef<Node | undefined>;
  continents: ComputedRef<ContinentsInfo>;
  subscribedNodes: ComputedRef<Node[]>;
  isDefaultNodeLoading: ComputedRef<boolean>;
  loadNodes(): Promise<void>;
  loadContinents(): Promise<void>;
} {
  const store = useStore();

  const selectedNode = computed<Node | undefined>(
    () => store.getters.selectedNode
  );
  const continents = computed<ContinentsInfo>(() => store.getters.continents);
  const subscribedNodes = computed<Node[]>(() => store.getters.subscribedNodes);
  const isDefaultNodeLoading = computed<boolean>(
    () => store.getters.isDefaultNodeLoading
  );

  const loadNodes = async (): Promise<void> => {
    await store.dispatch("selectDefaultNode");
  };

  const loadContinents = async (): Promise<void> => {
    await store.dispatch("fetchContinents");
  };

  return {
    selectedNode,
    continents,
    subscribedNodes,
    isDefaultNodeLoading,
    loadNodes,
    loadContinents,
  };
}
