import type { ComputedRef } from "vue";
import type {
  ContinentsInfo,
  Node,
  NodesSearchParameters,
  Quota,
} from "@/types";
import { useStore } from "vuex";
import { computed } from "vue";

export default function useNodes(): {
  selectedNode: ComputedRef<Node | undefined>;
  selectedNodeQuota: ComputedRef<Quota | undefined>;
  isDefaultNodeLoading: ComputedRef<boolean>;
  continents: ComputedRef<ContinentsInfo>;
  nodes: ComputedRef<Node[]>;
  isNodesLoading: ComputedRef<boolean>;
  isNodesLoadingFailed: ComputedRef<boolean>;
  isMoreNodesAvailable: ComputedRef<boolean>;
  subscribedNodes: ComputedRef<Node[]>;
  isSubscribedNodesLoading: ComputedRef<boolean>;
  isSubscribedNodesLoadingFailed: ComputedRef<boolean>;
  isMoreSubscribedNodesAvailable: ComputedRef<boolean>;
  loadAllNodes(): Promise<void>;
  loadAvailableNodes(parameters?: NodesSearchParameters): Promise<void>;
  loadMoreAvailableNodes(parameters?: NodesSearchParameters): Promise<void>;
  loadSubscribedNodes(): Promise<void>;
  loadMoreSubscribedNodes(): Promise<void>;
  loadContinents(): Promise<void>;
} {
  const store = useStore();

  const isDefaultNodeLoading = computed<boolean>(
    () => store.getters.isDefaultNodeLoading
  );
  const selectedNode = computed<Node | undefined>(
    () => store.getters.selectedNode
  );
  const selectedNodeQuota = computed<Quota | undefined>(
    () => store.getters.quota
  );

  const continents = computed<ContinentsInfo>(() => store.getters.continents);

  const nodes = computed<Node[]>(() => store.getters.nodes);
  const isNodesLoading = computed<boolean>(() => store.getters.isNodesLoading);
  const isNodesLoadingFailed = computed<boolean>(
    () => store.getters.isNodesLoadingFailed
  );
  const isMoreNodesAvailable = computed<boolean>(
    () => store.getters.isMoreNodesAvailable
  );

  const subscribedNodes = computed<Node[]>(() => store.getters.subscribedNodes);
  const isSubscribedNodesLoading = computed<boolean>(
    () => store.getters.isSubscribedNodesLoading
  );
  const isSubscribedNodesLoadingFailed = computed<boolean>(
    () => store.getters.isSubscribedNodesLoadingFailed
  );
  const isMoreSubscribedNodesAvailable = computed<boolean>(
    () => store.getters.isMoreSubscribedNodesAvailable
  );

  const loadAllNodes = async (): Promise<void> => {
    await store.dispatch("selectDefaultNode");
  };

  const loadAvailableNodes = async (
    parameters?: NodesSearchParameters
  ): Promise<void> => {
    await store.dispatch("fetchNodes", parameters);
  };

  const loadMoreAvailableNodes = async (
    parameters?: NodesSearchParameters
  ): Promise<void> => {
    await store.dispatch("fetchMoreNodes", parameters);
  };

  const loadSubscribedNodes = async (): Promise<void> => {
    await store.dispatch("fetchSubscribedNodes");
  };

  const loadMoreSubscribedNodes = async (): Promise<void> => {
    await store.dispatch("fetchMoreSubscribedNodes");
  };

  const loadContinents = async (): Promise<void> => {
    await store.dispatch("fetchContinents");
  };

  return {
    isDefaultNodeLoading,
    selectedNode,
    selectedNodeQuota,
    continents,
    nodes,
    isNodesLoading,
    isNodesLoadingFailed,
    isMoreNodesAvailable,
    subscribedNodes,
    isSubscribedNodesLoading,
    isSubscribedNodesLoadingFailed,
    isMoreSubscribedNodesAvailable,
    loadAllNodes,
    loadAvailableNodes,
    loadMoreAvailableNodes,
    loadSubscribedNodes,
    loadMoreSubscribedNodes,
    loadContinents,
  };
}
