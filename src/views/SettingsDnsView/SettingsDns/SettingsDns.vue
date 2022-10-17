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
import DnsInfoList from "@/components/app/DnsInfoList/DnsInfoList.vue";
import useDns from "@/hooks/useDns";

const {
  selectedDns,
  dnsConfigurations,
  isDnsConfigurationsLoading,
  selectDns,
} = useDns();
</script>

<style lang="scss" scoped>
.settings-dns {
  padding: 0 16px 16px;
  width: 100%;
  border-top: 1px solid var(--slr__border-clr);
}
</style>
