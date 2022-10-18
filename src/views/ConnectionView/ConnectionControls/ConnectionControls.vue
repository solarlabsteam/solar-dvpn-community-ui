<template>
  <div class="connection-controls">
    <node-switch :node="selectedNode" />
    <slr-button
      :variant="isConnected ? 'secondary' : 'primary'"
      :large="true"
      :block="true"
      :disabled="!selectedNode"
      :loading="isConnectionLoading"
      @click="toggleConnect"
    >
      {{ isConnected ? t("connection.disconnect") : t("connection.connect") }}
    </slr-button>
  </div>
</template>

<script setup lang="ts">
import NodeSwitch from "@/components/app/NodeSwitch/NodeSwitch.vue";
import SlrButton from "@/components/ui/SlrButton/SlrButton.vue";
import useConnection from "@/hooks/useConnection";
import { useI18n } from "vue-i18n";
import useError from "@/hooks/useError";
import useNodes from "@/hooks/useNodes";

const { t } = useI18n();
const { connect, disconnect, isConnectionLoading, isConnected } =
  useConnection();
const { selectedNode } = useNodes();
const { setError } = useError();

const toggleConnect = (): void => {
  if (!selectedNode.value) return;
  if (isConnectionLoading.value) return;

  if (isConnected.value) {
    disconnect().catch((e) => setError(JSON.stringify(e)));
    return;
  }

  connect(selectedNode.value).catch((e) => setError(JSON.stringify(e)));
};
</script>

<style lang="scss" scoped>
.connection-controls {
  display: flex;
  flex-direction: column;
  gap: 23px;
  box-sizing: border-box;
  padding: 0 16px 16px;
  width: 100%;
}
</style>
