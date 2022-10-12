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
import { useStore } from "vuex";
import LoadingOverlay from "@/components/app/LoadingOverlay";
import SubscriptionModal from "@/components/app/SubscriptionModal";
import NodesFiltersModal from "@/components/app/NodesFiltersModal";
import useError from "@/hooks/useError";
import { wsProvider } from "@/api";

const store = useStore();
const selectedNode = computed<Node>(() => store.getters.selectedNode);
const isDnsConfigurationsLoading = computed<boolean>(
  () => store.getters.dnsConfigurationsLoadingState
);
const isDefaultNodeLoading = computed<boolean>(
  () => store.getters.isDefaultNodeLoading
);
const isLogoutInProcess = computed<boolean>(
  () => store.getters.isLogoutLoading
);
// const isWalletLoading = computed<boolean>(
//   () => store.getters.isWalletLoading
// );
const isAppLoading = computed<boolean>(
  () =>
    isLogoutInProcess.value ||
    isDefaultNodeLoading.value ||
    isDnsConfigurationsLoading.value
);

const { error, setError } = useError();

const resetError = () => {
  setError(undefined);
};

onBeforeMount(() => {
  store.dispatch("getWallet").catch((e) => {
    setError(e.message);
  });
  store.dispatch("selectDefaultNode").catch((e) => {
    setError(e.message);
  });
  store.dispatch("fetchNodes").catch((e) => {
    setError(e.message);
  });
  store.dispatch("fetchDnsConfigurations").catch((e) => {
    setError(e.message);
  });
});

onBeforeUnmount(() => {
  wsProvider.closeConnection();
});

onErrorCaptured((e) => {
  setError(`APP ${JSON.stringify(e)}`);
});

watch(
  () => store.getters.wallet,
  (wallet) => {
    if (!wallet) return;
    if (!selectedNode.value) {
      store.dispatch("selectDefaultNode").catch((e) => {
        setError(e.message);
      });
    } else {
      store.dispatch("fetchSubscribedNodes").catch((e) => {
        setError(e.message);
      });
    }
    store.dispatch("fetchContinents").catch((e) => {
      setError(e.message);
    });
    wsProvider.openConnection();
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
  -webkit-app-region: drag;
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
