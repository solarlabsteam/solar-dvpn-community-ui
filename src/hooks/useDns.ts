import type { ComputedRef } from "vue";
import type { DnsInfo } from "@/types";
import { useStore } from "vuex";
import { computed } from "vue";

function useDns(): {
  selectedDns: ComputedRef<DnsInfo>;
  dnsConfigurations: ComputedRef<DnsInfo[]>;
  isDnsConfigurationsLoading: ComputedRef<boolean>;
  selectDns(dns: DnsInfo): void;
} {
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

  return {
    selectedDns,
    dnsConfigurations,
    isDnsConfigurationsLoading,
    selectDns,
  };
}

export default useDns;
