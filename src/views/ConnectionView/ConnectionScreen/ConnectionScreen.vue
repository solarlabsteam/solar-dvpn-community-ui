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
import { computed } from "vue";
import ConnectionDetails from "../ConnectionDetails";
import { formatBandwidth } from "@/utils/formatters";
import type { Bandwidth } from "@/types";
import AccountPreview from "@/views/ConnectionView/AccountPreview";
import ConnectionStatus from "@/views/ConnectionView/ConnectionStatus/ConnectionStatus.vue";
import ConnectionControls from "@/views/ConnectionView/ConnectionControls/ConnectionControls.vue";
import useNodes from "@/hooks/useNodes";
import useConnection from "@/hooks/useConnection";

const { isConnected } = useConnection();
const { selectedNode: node, selectedNodeQuota: quota } = useNodes();

const bandwidthDownload = computed<Bandwidth>(() =>
  formatBandwidth(node.value?.bandwidthDownload || 0)
);
const bandwidthUpload = computed<Bandwidth>(() =>
  formatBandwidth(node.value?.bandwidthUpload || 0)
);
const bandwidthLeft = computed<string>(() =>
  (
    (Number(quota.value?.allocated || 0) - Number(quota.value?.consumed || 0)) /
    1e9
  ).toFixed(2)
);
</script>

<style lang="scss" src="./ConnectionScreen.scss" scoped />
