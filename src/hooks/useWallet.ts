import { useStore } from "vuex";
import { useRouter } from "vue-router";
import type { Wallet, WalletProfile } from "@/types";
import useError from "@/hooks/useError";
import { computed, type ComputedRef } from "vue";

export default function useWallet(): {
  isWalletLoading: ComputedRef<boolean>;
  create(): Promise<WalletProfile | undefined>;
  get(): Promise<WalletProfile>;
  recover(mnemonic: string): Promise<void>;
  logout(): void;
} {
  const store = useStore();
  const router = useRouter();
  const { setError } = useError();

  const isWalletLoading = computed<boolean>(
    () => store.getters.isWalletLoading
  );

  const create = async (): Promise<WalletProfile | undefined> => {
    try {
      return await store.dispatch("createWallet");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const get = async (): Promise<WalletProfile> => {
    return await store.dispatch("getWallet");
  };

  const recover = async (mnemonic: string): Promise<void> => {
    await store.dispatch("recoverWallet", mnemonic);
  };

  const logout = (): void => {
    store.dispatch("deleteWallet").then(() => router.push({ name: "setup" }));
  };

  return {
    isWalletLoading,
    create,
    get,
    recover,
    logout,
  };
}
