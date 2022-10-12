<template>
  <div class="settings-dns">
    <dns-info-list
      v-if="!isDnsConfigurationsLoading"
      :selected-dns="selectedDns.name"
      :select-dns="selectDns"
      :dns-configurations="dnsConfigurations"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import type { DnsInfo } from "@/types";
import DnsInfoList from "@/components/app/DnsInfoList/DnsInfoList.vue";

const store = useStore();

const dnsConfigurations = computed<DnsInfo[]>(
  () => store.getters.dnsConfigurations
);
const selectedDns = computed<DnsInfo>(() => store.getters.selectedDns);
const isDnsConfigurationsLoading = computed<boolean>(
  () => store.getters.dnsConfigurationsLoadingState
);

const selectDns = (info: DnsInfo): void => {
  store.dispatch("selectDns", info);
};
</script>

<style lang="scss" scoped>
.settings-dns {
  padding: 0 16px 16px;
  width: 100%;
  border-top: 1px solid var(--slr__border-clr);
}
</style>
