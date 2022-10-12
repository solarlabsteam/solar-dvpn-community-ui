<template>
  <ul class="dns-info-list">
    <li
      v-for="info in dnsConfigurations"
      :key="info.name"
      class="dns-info-list__item slr-clickable"
      @click.prevent.stop="() => selectDns(info)"
    >
      <dns-info-preview :info="info" />
      <slr-icon v-if="selectedDns === info.name" :icon="'checkmark'" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import DnsInfoPreview from "@/components/app/DnsInfoPreview/DnsInfoPreview.vue";
import type { DnsInfo } from "@/types";
import SlrIcon from "@/components/ui/SlrIcon/SlrIcon.vue";

defineProps<{
  dnsConfigurations: DnsInfo[];
  selectedDns: string;
  selectDns: (info: DnsInfo) => void;
}>();
</script>

<style lang="scss" src="./DnsInfoList.scss" scoped />
