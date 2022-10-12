<template>
  <slr-view>
    <template #header-nav>
      <slr-icon
        class="slr-clickable"
        :icon="'cross-active'"
        :size="20"
        @click.prevent.stop="() => close()"
      />
    </template>
    <template #header-title>Get Started</template>
    <template #content>
      <setup-mnemonic />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SetupMnemonic from "@/views/SetupMnemonicView/SetupMnemonic";

const router = useRouter();

const close = () => {
  router.push({ name: "setup" });
};
</script>
