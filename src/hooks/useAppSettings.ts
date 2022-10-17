import { useStore } from "vuex";
import type { ComputedRef } from "vue";
import { computed } from "vue";

export default function useAppSettings(): {
  isAuthorized: ComputedRef<boolean>;
  isLoginInProgress: ComputedRef<boolean>;
  isLogoutInProgress: ComputedRef<boolean>;
  isAppSetupInProgress: ComputedRef<boolean>;
  setupApp(): Promise<void>;
  login(): Promise<void>;
  logout(): Promise<void>;
} {
  const store = useStore();

  const isAuthorized = computed<boolean>(() => store.getters.isAuthorized);
  const isLoginInProgress = computed<boolean>(
    () => store.getters.isLoginInProgress
  );
  const isLogoutInProgress = computed<boolean>(
    () => store.getters.isLogoutInProgress
  );
  const isAppSetupInProgress = computed<boolean>(
    () => store.getters.isAppSetupInProgress
  );

  const setupApp = async (): Promise<void> => {
    await store.dispatch("setupApp");
  };

  const login = async (): Promise<void> => {
    await store.dispatch("login");
  };

  const logout = async (): Promise<void> => {
    await store.dispatch("logout");
  };

  return {
    isAuthorized,
    isLoginInProgress,
    isLogoutInProgress,
    isAppSetupInProgress,
    setupApp,
    login,
    logout,
  };
}
