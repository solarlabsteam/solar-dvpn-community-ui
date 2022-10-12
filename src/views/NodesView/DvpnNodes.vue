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
import { useStore } from "vuex";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import SubscribedNodes from "@/views/NodesView/tabs/SubscribedNodes.vue";
import ContinentsList from "@/components/app/ContinentsList/ContinentsList.vue";
import type { ContinentsInfo, Node, ContinentCode } from "@/types";

const store = useStore();
const { t } = useI18n();
const router = useRouter();
const subscribedNodesList = computed<Node[]>(
  () => store.getters.subscribedNodes
);
const defaultActiveTab = computed<number>(() =>
  subscribedNodesList.value.length > 0 ? 0 : 1
);
const continents = computed<ContinentsInfo>(() => store.getters.continents);

const openContinent = (code: ContinentCode) => {
  router.push({ name: "nodes-available", query: { continentCode: code } });
};
</script>

<style lang="scss" scoped>
.dvpn-nodes {
  width: 100%;
  padding: 0 16px 16px;
}
</style>
