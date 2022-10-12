<template>
  <slr-button
    :block="true"
    :loading="isLogoutLoading"
    :disabled="isLogoutLoading"
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
import useWallet from "@/hooks/useWallet";
import useAppRouter from "@/hooks/useAppRouter";
import useError from "@/hooks/useError";

const { openSetupGreetingView } = useAppRouter();
const { logout, isLogoutLoading } = useWallet();
const { setError } = useError();

const logoutWallet = () => {
  logout()
    .then(openSetupGreetingView)
    .catch((e) => setError(JSON.stringify(e)));
};
</script>
