import type { ComputedRef } from "vue";
import type { DnsInfo } from "@/types";
import { useStore } from "vuex";
import { computed } from "vue";

function useDns(): {
  selectedDns: ComputedRef<DnsInfo>;
  dnsConfigurations: ComputedRef<DnsInfo[]>;
  isDnsConfigurationsLoading: ComputedRef<boolean>;
  selectDns(dns: DnsInfo): Promise<void>;
  loadDnsConfigurations(): Promise<void>;
} {
  const store = useStore();

  const dnsConfigurations = computed<DnsInfo[]>(
    () => store.getters.dnsConfigurations
  );
  const selectedDns = computed<DnsInfo>(() => store.getters.selectedDns);
  const isDnsConfigurationsLoading = computed<boolean>(
    () => store.getters.dnsConfigurationsLoadingState
  );

  const selectDns = async (info: DnsInfo): Promise<void> => {
    await store.dispatch("selectDns", info);
  };

  const loadDnsConfigurations = async (): Promise<void> => {
    await store.dispatch("fetchDnsConfigurations");
  };

  return {
    selectedDns,
    dnsConfigurations,
    isDnsConfigurationsLoading,
    selectDns,
    loadDnsConfigurations,
  };
}

export default useDns;
