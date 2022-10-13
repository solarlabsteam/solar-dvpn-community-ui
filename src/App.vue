<template>
  <div v-if="error" class="app-error slr-clickable" @click="resetError">
    {{ error }}
  </div>

  <loading-overlay v-if="isAppLoading" />

  <template v-else>
    <router-view />

    <transition name="modal">
      <subscription-modal />
    </transition>

    <transition name="modal">
      <nodes-filters-modal />
    </transition>
  </template>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onErrorCaptured,
  watch,
} from "vue";
import LoadingOverlay from "@/components/app/LoadingOverlay";
import SubscriptionModal from "@/components/app/SubscriptionModal";
import NodesFiltersModal from "@/components/app/NodesFiltersModal";
import useError from "@/hooks/useError";
import { wsProvider } from "@/api";
import useDns from "@/hooks/useDns";
import useWallet from "@/hooks/useWallet";
import useAppSettings from "@/hooks/useAppSettings";
import useAppRouter from "@/hooks/useAppRouter";
import useNodes from "@/hooks/useNodes";

const { isDnsConfigurationsLoading, loadDnsConfigurations } = useDns();
const { get } = useWallet();
const { openSetupGreetingView, openConnectionView } = useAppRouter();
const { isAuthorized, isAppSetupInProgress, setupApp } = useAppSettings();
const { isDefaultNodeLoading, selectDefaultNode, loadContinents } = useNodes();

const isAppLoading = computed<boolean>(
  () =>
    isAppSetupInProgress.value ||
    isDefaultNodeLoading.value ||
    isDnsConfigurationsLoading.value
);

const { error, setError } = useError();

const resetError = () => {
  setError(undefined);
};

const loadData = () => {
  Promise.allSettled([
    get(),
    selectDefaultNode(),
    loadContinents(),
    loadDnsConfigurations(),
  ])
    .then((results) => {
      results
        .filter((result) => result.status === "rejected")
        .forEach((result) =>
          setError(JSON.stringify((result as PromiseRejectedResult).reason))
        );
      wsProvider.openConnection();
    })
    .catch((e) => setError(JSON.stringify(e)));
};

onBeforeMount(() => {
  setupApp()
    .then(() => {
      if (isAuthorized.value) {
        openConnectionView();
        loadData();
      } else {
        openSetupGreetingView();
      }
    })
    .catch((e) => setError(JSON.stringify(e)));
});

onBeforeUnmount(() => {
  wsProvider.closeConnection();
});

onErrorCaptured((e) => {
  setError(`APP ${JSON.stringify(e)}`);
});

watch(() => isAuthorized.value, loadData);
</script>

<style lang="scss">
@import "@/styles/index.scss";

html {
  height: 100%;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 0;
}

#app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--slr__body-bg-clr);
  font-family: "Poppins", sans-serif;
  color: var(--slr__txt-clr);
  user-select: none;
  box-shadow: 0 0 15px 0 gray;
  z-index: 1;

  @include font-template(14px, 17px);
}

.app-error {
  position: absolute;
  padding: 22px 16px;
  top: 0;
  background-color: var(--slr__connection-txt-danger-clr);
  color: white;
  width: 100%;
  overflow-x: auto;
  z-index: 1;
  box-sizing: border-box;
  word-break: break-all;
}
</style>
