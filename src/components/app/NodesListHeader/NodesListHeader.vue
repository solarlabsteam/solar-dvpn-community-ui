<template>
  <div class="nodes-list-header__header px-0 py-0 mb-4">
    <div class="nodes-list-header__back-btn">
      <slr-icon :icon="'chevron-left'" :width="9" :height="14" />
      <slr-button class="m-s13-lh16" :tiny="true" :text="true" @click="back">
        {{ t("action.back") }}
      </slr-button>
    </div>

    <span class="nodes-list-header__location m-s13-lh16"
      >{{ title }}&nbsp;</span
    >

    <div class="nodes-list-header__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps<{
  title: string;
  back: () => void;
}>();

const { t } = useI18n();
</script>

<style lang="scss" src="./NodesListHeader.scss" />
