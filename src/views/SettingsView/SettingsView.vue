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
      <settings-controls />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import SettingsControls from "@/views/SettingsView/SettingsControls";
import useAppRouter from "@/hooks/useAppRouter";

const { openConnectionView } = useAppRouter();

const close = () => {
  openConnectionView();
};
</script>

<style lang="scss" scoped></style>
