<template>
  <div
    class="connection-detail"
    :class="{ 'connection-detail--connected': isConnected }"
  >
    <slr-icon
      class="connection-detail__icon"
      :icon="icon"
      :width="18"
      :height="22"
    />

    <p class="connection-detail__value">
      <span class="connection-detail__amount">{{ value }}</span>
      <span class="connection-detail__units">{{ units }}</span>
    </p>

    <p class="connection-detail__type">
      {{ t(`connection.${type}`) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import icons from "./icons";
import type { ConnectionDetailType } from "@/types";

const props = defineProps<{
  isConnected: boolean;
  type: ConnectionDetailType;
  value: string;
  units: string;
}>();

const { t } = useI18n();
const icon = computed<string>(() =>
  props.isConnected ? `${icons[props.type]}-success` : icons[props.type]
);
</script>

<style lang="scss" src="./ConnectionDetail.scss" scoped />
