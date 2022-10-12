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
    <template #header-title>Settings</template>
    <template #content>
      <settings-dns />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import SettingsDns from "@/views/SettingsView/SettingsDns";
import useAppRouter from "@/hooks/useAppRouter";

const { openConnectionView } = useAppRouter();

const close = () => {
  openConnectionView();
};
</script>

<style lang="scss" scoped></style>
