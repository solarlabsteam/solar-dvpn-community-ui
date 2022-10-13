import { useStore } from "vuex";
import type { Wallet } from "@/types";
import { computed, type ComputedRef } from "vue";

export default function useWallet(): {
  wallet: ComputedRef<Wallet>;
  isWalletLoading: ComputedRef<boolean>;
  create(): Promise<string>;
  get(): Promise<void>;
  recover(mnemonic: string): Promise<void>;
  remove(): Promise<void>;
} {
  const store = useStore();

  const wallet = computed<Wallet>(() => store.getters.wallet);
  const isWalletLoading = computed<boolean>(
    () => store.getters.isWalletLoading
  );

  const create = async (): Promise<string> => {
    return await store.dispatch("createWallet");
  };

  const get = async (): Promise<void> => {
    await store.dispatch("getWallet");
  };

  const recover = async (mnemonic: string): Promise<void> => {
    await store.dispatch("recoverWallet", mnemonic);
  };

  const remove = async (): Promise<void> => {
    await store.dispatch("deleteWallet");
  };

  return {
    wallet,
    isWalletLoading,
    create,
    get,
    recover,
    remove,
  };
}
