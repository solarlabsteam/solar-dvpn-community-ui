import type { NodesFilters } from "@/types";
import { useStore } from "vuex";
import type { ComputedRef } from "vue";
import { computed } from "vue";

export default function useNodesFilters(): {
  filters: ComputedRef<NodesFilters>;
  setFilters(filters: NodesFilters): Promise<void>;
  clearFilters(): Promise<void>;
} {
  const store = useStore();

  const filters = computed<NodesFilters>(() => store.getters.filters);

  const setFilters = async (value: NodesFilters): Promise<void> => {
    await store.dispatch("setFilters", value);
  };

  const clearFilters = async (): Promise<void> => {
    await store.dispatch("clearFilters");
  };

  return { filters, setFilters, clearFilters };
}
