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
    <template #header-title>Account</template>
    <template #content>
      <account-settings />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import SlrView from "@/components/ui/SlrView/SlrView.vue";
import { useRouter } from "vue-router";
import AccountSettings from "@/views/AccountView/AccountSettings";

const router = useRouter();

const close = () => {
  router.push({ name: "home" });
};
</script>

<style lang="scss" scoped></style>
