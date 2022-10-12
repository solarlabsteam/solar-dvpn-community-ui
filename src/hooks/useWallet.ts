import { useStore } from "vuex";
import type { Wallet, WalletProfile } from "@/types";
import { computed, type ComputedRef } from "vue";

export default function useWallet(): {
  wallet: ComputedRef<Wallet>;
  isWalletLoading: ComputedRef<boolean>;
  isLogoutLoading: ComputedRef<boolean>;
  create(): Promise<WalletProfile>;
  get(): Promise<void>;
  recover(mnemonic: string): Promise<void>;
  logout(): Promise<void>;
} {
  const store = useStore();

  const wallet = computed<Wallet>(() => store.getters.wallet);
  const isWalletLoading = computed<boolean>(
    () => store.getters.isWalletLoading
  );
  const isLogoutLoading = computed<boolean>(
    () => store.getters.isLogoutLoading
  );

  const create = async (): Promise<WalletProfile> => {
    return await store.dispatch("createWallet");
  };

  const get = async (): Promise<void> => {
    await store.dispatch("getWallet");
  };

  const recover = async (mnemonic: string): Promise<void> => {
    await store.dispatch("recoverWallet", mnemonic);
  };

  const logout = async (): Promise<void> => {
    await store.dispatch("deleteWallet");
  };

  return {
    wallet,
    isWalletLoading,
    isLogoutLoading,
    create,
    get,
    recover,
    logout,
  };
}
