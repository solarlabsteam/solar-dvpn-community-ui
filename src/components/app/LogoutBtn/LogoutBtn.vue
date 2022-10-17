<template>
  <slr-button
    :block="true"
    :loading="isLogoutInProgress || isWalletLoading"
    :disabled="isLogoutInProgress || isWalletLoading"
    :large="true"
    :variant="'danger'"
    @click="logoutWallet"
  >
    <template #default="{ loading }">
      <slr-loader v-if="loading" :size="16" />
      <span v-if="!loading">Log Out</span>
    </template>
  </slr-button>
</template>

<script setup lang="ts">
import useAppRouter from "@/hooks/useAppRouter";
import useError from "@/hooks/useError";
import useAppSettings from "@/hooks/useAppSettings";
import useWallet from "@/hooks/useWallet";

const { openSetupGreetingView } = useAppRouter();
const { isWalletLoading, remove } = useWallet();
const { isLogoutInProgress, logout } = useAppSettings();
const { setError } = useError();

const logoutWallet = () => {
  remove()
    .then(logout)
    .then(openSetupGreetingView)
    .catch((e) => setError(JSON.stringify(e)));
};
</script>
