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
    <template #header-title>{{ t("node.list.title") }}</template>
    <template #header-action>
      <slr-button
        class="r-s17-lh20 mnemonic-recover-btn"
        :tiny="true"
        :text="true"
        @click="search"
      >
        {{ t("action.search") }}
      </slr-button>
    </template>
    <template #content>
      <dvpn-nodes />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import DvpnNodes from "@/views/NodesView/Nodes";
import { useI18n } from "vue-i18n";
import useAppRouter from "@/hooks/useAppRouter";

const { t } = useI18n();
const { openConnectionView, openNodesSearchView } = useAppRouter();

const close = () => {
  openConnectionView();
};

const search = () => {
  openNodesSearchView();
};
</script>

<style lang="scss" scoped></style>
