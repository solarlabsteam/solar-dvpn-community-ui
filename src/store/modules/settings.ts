import type { Module } from "vuex";
import { SettingsMutationTypes } from "@/store/mutation-types";
import type { DnsInfo } from "@/types";
import dnsService from "@/services/DnsService";

interface SettingsState {
  dnsConfigurations: DnsInfo[];
  dnsConfigurationsLoadingState: boolean;
  dnsSelectionLoadingState: boolean;
  selectedDns?: DnsInfo;
}
const getDefaultState = (): SettingsState => ({
  dnsConfigurations: [],
  dnsConfigurationsLoadingState: false,
  dnsSelectionLoadingState: false,
  selectedDns: undefined,
});

export default {
  state: getDefaultState(),

  getters: {
    dnsConfigurations: (state): DnsInfo[] => state.dnsConfigurations,
    dnsConfigurationsLoadingState: (state): boolean =>
      state.dnsConfigurationsLoadingState,
    dnsSelectionLoadingState: (state): boolean =>
      state.dnsSelectionLoadingState,
    selectedDns: (state): DnsInfo | undefined => state.selectedDns,
  },

  actions: {
    async fetchDnsConfigurations({ commit }): Promise<void> {
      commit(SettingsMutationTypes.SET_DNS_CONFIGURATIONS_LOADING_STATE, true);

      try {
        const configurations = await dnsService.queryDnsConfigurations();
        const selectedConfiguration =
          await dnsService.querySelectedDnsConfiguration();
        commit(SettingsMutationTypes.SET_SELECTED_DNS, selectedConfiguration);
        commit(SettingsMutationTypes.SET_DNS_CONFIGURATIONS, configurations);
      } finally {
        commit(
          SettingsMutationTypes.SET_DNS_CONFIGURATIONS_LOADING_STATE,
          false
        );
      }
    },

    async selectDns({ commit }, payload: DnsInfo): Promise<void> {
      commit(SettingsMutationTypes.SET_DNS_SELECTION_LOADING_STATE, true);

      try {
        await dnsService.selectDnsConfiguration(payload.name);
        commit(SettingsMutationTypes.SET_SELECTED_DNS, payload);
      } finally {
        commit(SettingsMutationTypes.SET_DNS_SELECTION_LOADING_STATE, false);
      }
    },

    async resetSettingsState({ commit }): Promise<void> {
      commit(SettingsMutationTypes.RESET_SETTINGS_STATE);
    },
  },

  mutations: {
    [SettingsMutationTypes.SET_DNS_CONFIGURATIONS](
      state,
      payload: DnsInfo[]
    ): void {
      state.dnsConfigurations = payload;
    },
    [SettingsMutationTypes.SET_DNS_CONFIGURATIONS_LOADING_STATE](
      state,
      payload: boolean
    ): void {
      state.dnsConfigurationsLoadingState = payload;
    },
    [SettingsMutationTypes.SET_DNS_SELECTION_LOADING_STATE](
      state,
      payload: boolean
    ): void {
      state.dnsSelectionLoadingState = payload;
    },
    [SettingsMutationTypes.SET_SELECTED_DNS](state, payload: DnsInfo): void {
      state.selectedDns = payload;
    },
    [SettingsMutationTypes.RESET_SETTINGS_STATE](state): void {
      Object.assign(state, getDefaultState());
    },
  },
} as Module<SettingsState, any>;
