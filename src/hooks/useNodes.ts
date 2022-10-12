import type { ComputedRef } from "vue";
import type { ContinentsInfo, Node } from "@/types";
import { useStore } from "vuex";
import { computed } from "vue";

export default function useNodes(): {
  continents: ComputedRef<ContinentsInfo>;
  subscribedNodes: ComputedRef<Node[]>;
} {
  const store = useStore();

  const continents = computed<ContinentsInfo>(() => store.getters.continents);
  const subscribedNodes = computed<Node[]>(() => store.getters.subscribedNodes);

  return { continents, subscribedNodes };
}
