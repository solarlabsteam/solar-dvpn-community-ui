<template>
  <div class="node-switch">
    <node-preview v-if="node" :node="node" :show-price="false" />
    <slr-button
      :variant="'primary'"
      :light="true"
      :block="!node"
      @click="openNodesView"
    >
      {{ t("action.switch") }}
    </slr-button>
  </div>
</template>

<script setup lang="ts">
import NodePreview from "@/components/app/NodePreview";
import type { Node } from "@/types";
import SlrButton from "@/components/ui/SlrButton/SlrButton.vue";
import { useI18n } from "vue-i18n";
import useAppRouter from "@/hooks/useAppRouter";

defineProps<{
  node?: Node;
}>();

const { t } = useI18n();
const { openNodesView } = useAppRouter();
</script>

<style lang="scss" scoped>
.node-switch {
  display: flex;
}
</style>
