<template>
  <div class="settings">
    <settings-section :title="t('settings.dns')" class="mb-5">
      <template #content>
        <div class="settings__dns-preview">
          <dns-info-preview :info="selectedDns" />
          <slr-button
            :variant="'primary'"
            :light="true"
            @click="openDnsSettings"
          >
            {{ t("action.switch") }}
          </slr-button>
        </div>
      </template>
    </settings-section>
    <settings-section :title="t('settings.stopSessions.title')" class="mb-5">
      <template #content>
        {{ t("settings.stopSessions.text") }}
      </template>
      <template #buttons>
        <slr-button :variant="'danger'" :block="true" :large="true">
          {{ t("settings.stopSessions.button") }}
        </slr-button>
      </template>
    </settings-section>
    <settings-section :title="t('settings.removeConfigurations.title')">
      <template #content>
        {{ t("settings.removeConfigurations.text") }}
      </template>
      <template #buttons>
        <slr-button :variant="'danger'" :block="true" :large="true">
          {{ t("settings.removeConfigurations.button") }}
        </slr-button>
      </template>
    </settings-section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import type { DnsInfo } from "@/types";
import DnsInfoPreview from "@/components/app/DnsInfoPreview/DnsInfoPreview.vue";
import { useRouter } from "vue-router";
import SettingsSection from "@/components/app/SettingsSection/SettingsSection.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const router = useRouter();

const selectedDns = computed<DnsInfo>(() => store.getters.selectedDns);

const openDnsSettings = () => {
  router.push({ name: "settings-dns" });
};
</script>

<style lang="scss" scoped>
.settings {
  padding: 25px 16px 16px;
  width: 100%;
  border-top: 1px solid var(--slr__border-clr);
  overflow-x: auto;

  &__dns-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
