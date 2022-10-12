import { useRouter } from "vue-router";

export default function useAppRouter(): {
  openSetupGreetingView(): void;
  openSetupActionsView(): void;
  openSetupCreateView(mnemonic: string): void;
  openSetupRecoverView(): void;
  openSetupCompleteView(): void;
  openConnectionView(): void;
  openAccountView(): void;
  openSettingsView(): void;
  openSettingsDnsView(): void;
  openNodesView(): void;
  openNodesAvailableView(continentCode?: string, countryCode?: string): void;
  openNodesSearchView(continentCode?: string, countryCode?: string): void;
} {
  const router = useRouter();

  const openSetupGreetingView = (): void => {
    router.push({ name: "setup" });
  };

  const openSetupActionsView = (): void => {
    router.push({ name: "mnemonic-setup" });
  };

  const openSetupCreateView = (mnemonic: string): void => {
    router.push({
      name: "check-mnemonic",
      params: { mnemonic },
    });
  };

  const openSetupRecoverView = (): void => {
    router.push({ name: "recover-mnemonic" });
  };

  const openSetupCompleteView = (): void => {
    router.push({ name: "setup-complete" });
  };

  const openConnectionView = (): void => {
    router.push({ name: "home" });
  };

  const openAccountView = (): void => {
    router.push({ name: "account" });
  };

  const openSettingsView = (): void => {
    router.push({ name: "settings" });
  };

  const openSettingsDnsView = (): void => {
    router.push({ name: "settings-dns" });
  };

  const openNodesView = (): void => {
    router.push({ name: "nodes" });
  };

  const openNodesAvailableView = (
    continentCode?: string,
    countryCode?: string
  ): void => {
    router.push({
      name: "nodes-available",
      query: { continentCode, countryCode },
    });
  };

  const openNodesSearchView = (
    continentCode?: string,
    countryCode?: string
  ): void => {
    router.push({
      name: "nodes-search",
      query: { continentCode, countryCode },
    });
  };

  return {
    openSetupGreetingView,
    openSetupActionsView,
    openSetupCreateView,
    openSetupRecoverView,
    openSetupCompleteView,
    openConnectionView,
    openAccountView,
    openSettingsView,
    openSettingsDnsView,
    openNodesView,
    openNodesAvailableView,
    openNodesSearchView,
  };
}
