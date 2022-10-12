import { useRouter } from "vue-router";

function useSettings(): {
  openAccountSettings(): void;
  openDnsSettings(): void;
} {
  const router = useRouter();

  const openAccountSettings = (): void => {
    router.push({ name: "account" });
  };

  const openDnsSettings = (): void => {
    router.push({ name: "settings" });
  };

  return {
    openAccountSettings,
    openDnsSettings,
  };
}

export default useSettings;
