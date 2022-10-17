import type { Module } from "vuex";
import { AccountMutationTypes } from "@/store/mutation-types";
import type { Wallet } from "@/types";
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
    async getWallet({ commit }): Promise<void> {
      commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, true);
      try {
        const wallet = await walletService.getWallet();
        commit(AccountMutationTypes.SET_WALLET, wallet);
      } finally {
        commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, false);
      }
    },

    async createWallet({ commit }): Promise<string> {
      commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, true);
      try {
        const wallet = await walletService.createWallet();
        commit(AccountMutationTypes.SET_WALLET, wallet);
        return wallet.mnemonic;
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

    async deleteWallet({ commit }): Promise<void> {
      commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, true);

      try {
        await walletService.deleteWallet();
      } finally {
        commit(AccountMutationTypes.SET_WALLET_LOADING_STATE, false);
      }
    },

    async resetWalletState({ commit }) {
      commit(AccountMutationTypes.RESET_WALLET_STATE);
    },
  },

  mutations: {
    [AccountMutationTypes.SET_WALLET](
      state: AccountState,
      value: Wallet
    ): void {
      state.wallet = value;
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
