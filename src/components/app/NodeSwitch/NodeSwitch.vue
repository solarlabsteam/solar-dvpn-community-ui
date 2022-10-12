<template>
  <div class="node-switch">
    <node-preview :node="node" :show-price="false" />
    <slr-button :variant="'primary'" :light="true" @click="openNodes">
      {{ t("action.switch") }}
    </slr-button>
  </div>
</template>

<script setup lang="ts">
import NodePreview from "@/components/app/NodePreview";
import type { Node } from "@/types";
import SlrButton from "@/components/ui/SlrButton/SlrButton.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

defineProps<{
  node: Node;
}>();

const { t } = useI18n();
const router = useRouter();

const openNodes = () => {
  router.push({ name: "nodes" });
};
</script>

<style lang="scss" scoped>
.node-switch {
  display: flex;
}
</style>
