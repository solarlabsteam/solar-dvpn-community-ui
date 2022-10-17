import { useStore } from "vuex";
import { computed, type ComputedRef } from "vue";
import { type Node, NodeSelectionStatus, NodeStatus } from "@/types";
import useAppDialogs from "@/hooks/useAppDialogs";
import useAppRouter from "@/hooks/useAppRouter";

export default function useConnection(): {
  isConnected: ComputedRef<boolean>;
  isConnectionLoading: ComputedRef<boolean>;
  isStopSessionsInProgress: ComputedRef<boolean>;
  isResetConfigurationInProgress: ComputedRef<boolean>;
  select(node: Node): Promise<void>;
  connect(node: Node): Promise<void>;
  disconnect(): Promise<void>;
  stopSessions(): Promise<void>;
  resetConfiguration(): Promise<void>;
  setConnectionState(value: boolean): Promise<void>;
  checkNodeConnection(): Promise<void>;
} {
  const store = useStore();
  const { openConnectionView } = useAppRouter();
  const { openSubscriptionModal, openUnsubscriptionModal } = useAppDialogs();

  const isConnectionLoading = computed<boolean>(
    () => store.getters.isConnectionLoading
  );
  const isConnected = computed<boolean>(() => store.getters.isConnected);
  const isStopSessionsInProgress = computed<boolean>(
    () => store.getters.isStopSessionsInProgress
  );
  const isResetConfigurationInProgress = computed<boolean>(
    () => store.getters.isResetConfigurationInProgress
  );

  const handleNodeSelection = async (
    node: Node,
    connect: boolean
  ): Promise<void> => {
    if (
      node.blockchainAddress ===
        store.getters.selectedNode?.blockchainAddress ||
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
      openUnsubscriptionModal(node);
    }
  };

  const setConnectionState = async (value: boolean): Promise<void> => {
    await store.dispatch("setConnectionState", value);
    await store.dispatch("setConnectionLoadingState", false);
  };

  const connect = async (node: Node): Promise<void> => {
    await handleNodeSelection(node, true);
  };

  const disconnect = async (): Promise<void> => {
    await store.dispatch("disconnectFromNode");
  };

  const stopSessions = async (): Promise<void> => {
    await store.dispatch("stopSessions");
  };

  const resetConfiguration = async (): Promise<void> => {
    await store.dispatch("resetConfiguration");
  };

  const checkNodeConnection = async (): Promise<void> => {
    await store.dispatch("checkNodeConnection");
  };

  return {
    isConnectionLoading,
    isConnected,
    isStopSessionsInProgress,
    isResetConfigurationInProgress,
    select,
    connect,
    disconnect,
    stopSessions,
    resetConfiguration,
    setConnectionState,
    checkNodeConnection,
  };
}
