<template>
  <div v-if="error" class="app-error slr-clickable" @click="resetError">
    {{ error }}
  </div>

  <loading-overlay v-if="isAppLoading" />

  <template v-else>
    <router-view />

    <transition name="modal">
      <purchase-modal />
    </transition>

    <transition name="modal">
      <subscription-modal />
    </transition>

    <transition name="modal">
      <unsubscription-modal />
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
  onMounted,
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
import useConnection from "@/hooks/useConnection";
import UnsubscriptionModal from "@/components/app/UnsubscriptionModal";
import PurchaseModal from "@/components/app/PurchaseModal";

const { isDnsConfigurationsLoading, loadDnsConfigurations } = useDns();
const { get } = useWallet();
const { openSetupGreetingView, openConnectionView } = useAppRouter();
const { isAuthorized, isAppSetupInProgress, setupApp } = useAppSettings();
const { isDefaultNodeLoading, loadAllNodes, loadContinents } = useNodes();
const { checkNodeConnection, setConnectionState } = useConnection();

const isAppLoading = computed<boolean>(
  () =>
    isAppSetupInProgress.value ||
    isDefaultNodeLoading.value ||
    isDnsConfigurationsLoading.value
);

const { error, setError, resetError, handleError } = useError();

const loadData = () => {
  Promise.allSettled([
    get(),
    loadAllNodes(),
    loadContinents(),
    loadDnsConfigurations(),
  ])
    .then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          handleError(result.reason);
        }
      });
      wsProvider.openConnection(
        (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          switch (data.type) {
            case "tunnelStatus":
              setConnectionState(data.value === "connected");
              break;
            case "error":
              setError(JSON.stringify(data.value));
              break;
            default:
              setError(`Unsupported message type: ${data.type}.`);
              break;
          }
        },
        (event: Event) => {
          setError(
            `Socket connection error: ${event.type}; ${JSON.stringify(event)}.`
          );
        }
      );
    })
    .catch(handleError);
};

const onViewAppear = () => {
  if (isAuthorized.value) {
    checkNodeConnection();
  }
};

onBeforeMount(() => {
  window.addEventListener("focus", onViewAppear);

  setupApp()
    .then(() => {
      if (isAuthorized.value) {
        openConnectionView();
        loadData();
      } else {
        openSetupGreetingView();
      }
    })
    .catch(handleError);
});

onMounted(() => {
  window.focus();
});

onBeforeUnmount(() => {
  window.removeEventListener("focus", onViewAppear);

  wsProvider.closeConnection();
});

onErrorCaptured(handleError);

watch(
  () => isAuthorized.value,
  () => {
    if (isAuthorized.value) {
      loadData();
    } else {
      wsProvider.closeConnection();
    }
  }
);
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
  z-index: 100;
  box-sizing: border-box;
  word-break: break-all;
}
</style>
