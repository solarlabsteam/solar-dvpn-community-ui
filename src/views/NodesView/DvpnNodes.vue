<template>
  <div class="dvpn-nodes">
    <slr-tabs :default-active-tab="defaultActiveTab">
      <slr-tab :title="t('node.list.tab.subscriptions')">
        <subscribed-nodes />
      </slr-tab>
      <slr-tab :title="t('node.list.tab.allNodes')">
        <continents-list
          :continents="continents.continentsNodesCount"
          :open="openContinent"
        />
      </slr-tab>
    </slr-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import ContinentsList from "@/components/app/ContinentsList/ContinentsList.vue";
import type { ContinentCode } from "@/types";
import useAppRouter from "@/hooks/useAppRouter";
import useNodes from "@/hooks/useNodes";

const { t } = useI18n();
const { openNodesAvailableView } = useAppRouter();
const { subscribedNodes, continents } = useNodes();

const defaultActiveTab = computed<number>(() =>
  subscribedNodes.value.length > 0 ? 0 : 1
);

const openContinent = (code: ContinentCode) => openNodesAvailableView(code);
</script>

<style lang="scss" scoped>
.dvpn-nodes {
  width: 100%;
  padding: 0 16px 16px;
}
</style>
