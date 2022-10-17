<template>
  <div class="connection-screen">
    <account-preview />

    <div class="connection-screen__content-wrapper">
      <connection-status
        class="connection-screen__status"
        :is-connected="isConnected"
      />
      <connection-details
        class="connection-screen__details"
        :is-connected="isConnected"
        :bandwidth-download="bandwidthDownload"
        :consumed-gb="bandwidthLeft"
        :bandwidth-upload="bandwidthUpload"
      />
      <connection-controls />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import ConnectionDetails from "./ConnectionDetails";
import { formatBandwidth } from "@/utils/formatters";
import type { Bandwidth, Node, Quota } from "@/types";
import AccountPreview from "@/views/ConnectionView/AccountPreview";
import ConnectionStatus from "@/views/ConnectionView/ConnectionStatus/ConnectionStatus.vue";
import ConnectionControls from "@/views/ConnectionView/ConnectionControls/ConnectionControls.vue";
import useError from "@/hooks/useError";

const store = useStore();
const { setError } = useError();

const selectedNode = computed<Node>(() => store.getters.selectedNode);
const isConnected = computed<boolean>(() => store.getters.isConnected);
const quotaData = computed<Quota>(() => store.getters.quota);
const bandwidthDownload = computed<Bandwidth>(() =>
  formatBandwidth(selectedNode.value?.bandwidthDownload || 0)
);
const bandwidthUpload = computed<Bandwidth>(() =>
  formatBandwidth(selectedNode.value?.bandwidthUpload || 0)
);
const bandwidthLeft = computed<string>(() =>
  (
    (Number(quotaData.value?.allocated || 0) -
      Number(quotaData.value?.consumed || 0)) /
    1e9
  ).toFixed(2)
);

const handleSelectedNode = async (): Promise<void> => {
  try {
    await store.dispatch("fetchQuota");
  } catch (e) {
    setError(JSON.stringify(e));
  }
};

if (selectedNode.value) {
  handleSelectedNode();
}

store.watch(
  (): Node | undefined => store.getters.selectedNode,
  (node?: Node) => {
    if (!node) return;
    handleSelectedNode();
  }
);
</script>

<style lang="scss" src="./Connection.scss" scoped />
