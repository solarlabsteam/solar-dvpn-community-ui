import { useStore } from "vuex";
import { computed, type ComputedRef } from "vue";
import { type Node, NodeSelectionStatus } from "@/types";
import { useRouter } from "vue-router";
import useAppDialogs from "@/hooks/useAppDialogs";

export default function useConnection(): {
  select(node: Node): Promise<void>;
  connect(node: Node): Promise<void>;
  disconnect(): Promise<void>;
  isConnected: ComputedRef<boolean>;
  isConnectionLoading: ComputedRef<boolean>;
} {
  const store = useStore();
  const router = useRouter();
  const { openSubscriptionModal } = useAppDialogs();

  const isConnectionLoading = computed<boolean>(
    () => store.getters.isConnectionLoading
  );
  const isConnected = computed<boolean>(() => store.getters.isConnected);

  const handleNodeSelection = async (
    node: Node,
    connect: boolean
  ): Promise<void> => {
    if (
      node.blockchainAddress ===
        store.getters.connectedNode?.blockchainAddress ||
      isConnectionLoading.value
    ) {
      return;
    }

    const status: NodeSelectionStatus = await store.dispatch(
      "selectNodeChecked",
      node
    );

    switch (status) {
      case NodeSelectionStatus.SUBSCRIPTION_REQUIRED:
        openSubscriptionModal(node);
        return;
      case NodeSelectionStatus.SUCCESS:
        await router.push({ name: "home" });
        if (connect) {
          await store.dispatch("connectToNode");
        }
        return;
    }
  };

  const select = async (node: Node): Promise<void> => {
    return await handleNodeSelection(node, false);
  };

  const connect = async (node: Node): Promise<void> => {
    return await handleNodeSelection(node, true);
  };

  const disconnect = async (): Promise<void> => {
    await store.dispatch("disconnectFromNode");
  };

  return { select, connect, disconnect, isConnectionLoading, isConnected };
}
