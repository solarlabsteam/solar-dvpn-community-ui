<template>
  <div class="dns-info-preview">
    <slr-icon class="mr-2" :icon="info.name" :size="40" />
    <div class="dns-info-preview__content">
      <span class="dns-info-preview__name">{{ info.name }}</span>
      <span class="dns-info-preview__value">{{ info.addresses }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DnsInfo } from "@/types";

defineProps<{
  info: DnsInfo;
}>();
</script>

<style lang="scss" src="./DnsInfoPreview.scss" scoped />
