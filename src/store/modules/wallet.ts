import type { Module } from "vuex";
import { AccountMutationTypes } from "@/store/mutation-types";
import type { Wallet, WalletProfile } from "@/types";
import walletService from "@/services/WalletService";

interface AccountState {
  wallet?: Wallet;
  isWalletLoading: boolean;
  isLogoutLoading: boolean;
}

const getInitialState = (): AccountState => ({
  wallet: undefined,
  isWalletLoading: false,
  isLogoutLoading: false,
});

export default {
  state: getInitialState(),

  getters: {
    wallet: (state: AccountState): Wallet | undefined => state.wallet,
    isWalletLoading: (state: AccountState): boolean => state.isWalletLoading,
    isLogoutLoading: (state: AccountState): boolean => state.isLogoutLoading,
  },

  actions: {
    async getWallet({ commit }): Promise<Wallet> {
      commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, true);
      try {
        const wallet = await walletService.getWallet();
        commit(AccountMutationTypes.SET_WALLET, wallet);
        return wallet;
      } finally {
        commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, false);
      }
    },

    async createWallet({ commit }): Promise<WalletProfile> {
      commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, true);
      try {
        return await walletService.createWallet();
      } finally {
        commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, false);
      }
    },

    async recoverWallet({ commit }, mnemonic: string): Promise<void> {
      commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, true);
      try {
        const wallet = await walletService.recoverWallet(mnemonic);
        commit(AccountMutationTypes.SET_WALLET, wallet);
      } finally {
        commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, false);
      }
    },

    async deleteWallet({ commit, dispatch }): Promise<void> {
      commit(AccountMutationTypes.SET_LOG_OUT_LOADING_STATE, true);

      try {
        await walletService.deleteWallet();
        await dispatch("resetStates");
      } finally {
        commit(AccountMutationTypes.SET_LOG_OUT_LOADING_STATE, false);
      }
    },

    async resetWalletState({ commit }) {
      commit(AccountMutationTypes.RESET_WALLET_STATE);
    },

    async resetStates({ dispatch }): Promise<void> {
      await Promise.allSettled([
        dispatch("resetNodeState"),
        dispatch("resetQuotaState"),
        dispatch("resetSubscriptionState"),
        dispatch("resetSettingsState"),
        dispatch("resetWalletState"),
      ]);
    },
  },

  mutations: {
    [AccountMutationTypes.SET_WALLET](
      state: AccountState,
      value: Wallet
    ): void {
      state.wallet = value;
    },

    [AccountMutationTypes.SET_LOG_OUT_LOADING_STATE](
      state: AccountState,
      value: boolean
    ): void {
      state.isLogoutLoading = value;
    },

    [AccountMutationTypes.SET_WALLET_LOADING_STATE](
      state: AccountState,
      value: boolean
    ): void {
      state.isWalletLoading = value;
    },

    [AccountMutationTypes.RESET_WALLET_STATE](state: AccountState): void {
      Object.assign(state, getInitialState());
    },
  },
} as Module<AccountState, any>;
