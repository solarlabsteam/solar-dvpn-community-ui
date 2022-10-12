<template>
  <div class="continent-preview">
    <div
      class="continent-preview__map"
      :style="{
        backgroundImage: continentSvg,
      }"
    />
    <div class="continent-preview__info">
      <div class="continent-preview__title">
        {{ t(`continent.${code}`, { count: nodesLength }) }}
      </div>
      <div class="continent-preview__subtitle">
        {{ t("continent.parameters.availableNode", { count: nodesLength }) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { ContinentCode } from "@/types";

const props = defineProps<{ code: ContinentCode; nodesLength: number }>();

const { t } = useI18n();
const continentSvg = computed(() => `url(./assets/images/${props.code}.svg)`);
</script>

<style lang="scss" src="./ContinentPreview.scss" />
