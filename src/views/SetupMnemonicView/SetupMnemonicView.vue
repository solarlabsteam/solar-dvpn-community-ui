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
import SetupMnemonic from "@/views/SetupMnemonicView/SetupMnemonic";
import useAppRouter from "@/hooks/useAppRouter";

const { openSetupGreetingView } = useAppRouter();

const close = () => {
  openSetupGreetingView();
};
</script>
