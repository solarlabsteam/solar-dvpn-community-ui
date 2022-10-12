<template>
  <div class="account-preview">
    <div class="account-preview__icon slr-clickable" @click="openSettingsView">
      <slr-icon :icon="'gear'" :size="19" />
    </div>
    <div class="account-preview__info">
      <div class="text-right">
        <div class="account-preview__address">
          {{ croppedAddress }}
        </div>
        <div class="account-preview__balance">
          {{ `${wallet.balance / 1e6} DVPN` }}
        </div>
      </div>
      <div class="account-preview__icon slr-clickable" @click="openAccountView">
        <slr-icon :icon="'account'" :size="19" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import type { Wallet } from "@/types";
import useAppRouter from "@/hooks/useAppRouter";

const store = useStore();
const { openAccountView, openSettingsView } = useAppRouter();

const wallet = computed<Wallet>(() => store.getters.wallet);
const croppedAddress = computed<string>(
  () =>
    `${wallet.value.address.slice(0, 8)}...${wallet.value.address.slice(-8)}`
);
</script>

<style scoped lang="scss" src="./AccountPreview.scss" />
