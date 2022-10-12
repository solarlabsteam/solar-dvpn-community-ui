<template>
  <slr-button
    :block="true"
    :loading="isLogoutLoading"
    :large="true"
    :variant="'danger'"
    @click="logout"
  >
    <template #default="{ loading }">
      <slr-loader v-if="loading" :size="16" />
      <span v-if="!loading">Log Out</span>
    </template>
  </slr-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import useWallet from "@/hooks/useWallet";

const store = useStore();
const { logout } = useWallet();

const isLogoutLoading = computed<boolean>(() => store.getters.isLogoutLoading);
</script>
