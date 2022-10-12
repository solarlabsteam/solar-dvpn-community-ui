<template>
  <div class="connection_details">
    <connection-detail
      :is-connected="isConnected"
      :type="'upload'"
      :value="bandwidthUpload.value"
      :units="bandwidthUpload.units"
    />
    <connection-detail
      :is-connected="isConnected"
      :type="'bandwidth'"
      :value="consumedGb"
      :units="'GB'"
    />
    <connection-detail
      :is-connected="isConnected"
      :type="'download'"
      :value="bandwidthDownload.value"
      :units="bandwidthDownload.units"
    />
  </div>
</template>

<script setup lang="ts">
import ConnectionDetail from "@/views/ConnectionView/ConnectionDetails/ConnectionDetail";
import type { Bandwidth } from "@/types";

defineProps<{
  isConnected: boolean;
  bandwidthUpload: Bandwidth;
  bandwidthDownload: Bandwidth;
  consumedGb: string;
}>();
</script>

<style lang="scss" src="./ConnectionDetails.scss" scoped />
