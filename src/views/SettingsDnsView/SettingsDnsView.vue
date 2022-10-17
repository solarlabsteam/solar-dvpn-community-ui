<template>
  <slr-view>
    <template #header-nav>
      <slr-button class="r-s17-lh20" :tiny="true" :text="true" @click="back">
        {{ t("action.back") }}
      </slr-button>
    </template>
    <template #header-title>
      {{ t("settings.dns") }}
    </template>
    <template #content>
      <settings-dns />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import SlrView from "@/components/ui/SlrView";
import { useI18n } from "vue-i18n";
import SettingsDns from "@/views/SettingsDnsView/SettingsDns/SettingsDns.vue";
import useAppRouter from "@/hooks/useAppRouter";

const { openSettingsView } = useAppRouter();
const { t } = useI18n();

const back = () => {
  openSettingsView();
};
</script>
