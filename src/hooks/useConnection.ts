import { useStore } from "vuex";
import { computed, type ComputedRef } from "vue";
import { type Node, NodeSelectionStatus, NodeStatus } from "@/types";
import useAppDialogs from "@/hooks/useAppDialogs";
import useSubscription from "@/hooks/useSubscription";
import useAppRouter from "@/hooks/useAppRouter";

export default function useConnection(): {
  select(node: Node): Promise<void>;
  connect(node: Node): Promise<void>;
  disconnect(): Promise<void>;
  isConnected: ComputedRef<boolean>;
  isConnectionLoading: ComputedRef<boolean>;
} {
  const store = useStore();
  const { openConnectionView } = useAppRouter();
  const { unsubscribe } = useSubscription();
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
        openConnectionView();
        if (connect) {
          await store.dispatch("connectToNode");
        }
        return;
    }
  };

  const select = async (node: Node): Promise<void> => {
    if (node.status === NodeStatus.active) {
      await handleNodeSelection(node, false);
    } else {
      await unsubscribe(node);
    }
  };

  const connect = async (node: Node): Promise<void> => {
    return await handleNodeSelection(node, true);
  };

  const disconnect = async (): Promise<void> => {
    await store.dispatch("disconnectFromNode");
  };

  return { select, connect, disconnect, isConnectionLoading, isConnected };
}
