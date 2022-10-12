<template>
  <div class="nodes-search">
    <div :class="{ 'mb-4': !isNodesLoading }">
      <slr-search-input
        v-model="searchString"
        :placeholder="t('node.list.search.placeholder')"
      />
    </div>
    <slr-linear-loader v-if="isNodesLoading" class="available-nodes__loader" />

    <no-data
      v-else-if="
        !isLoadingFailed && !isNodesLoading && filteredNodes.length === 0
      "
      :title="t('node.list.noData.title')"
      :text="t('node.list.noData.text')"
    />
    <no-data
      v-else-if="isLoadingFailed"
      :title="t('node.list.loadingFailure.title')"
      :text="t('node.list.loadingFailure.text')"
      :action-text="t('action.retry')"
      :action="fetchNodes"
    />

    <nodes-list
      v-else
      class="nodes-search__list"
      :nodes="filteredNodes"
      :select="selectNode"
      :load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import useNodeActions from "@/hooks/useNodeActions";
import type { ContinentCode, Node, NodesSearchParameters } from "@/types";
import SlrLinearLoader from "@/components/ui/SlrLinearLoader";
import NodesList from "@/components/app/NodesList";
import NoData from "@/components/app/NoData";

defineProps<{
  continentCode?: ContinentCode;
  countryCode?: string;
}>();

const store = useStore();
const { t } = useI18n();
const { selectNode } = useNodeActions();

const searchString = ref("");
const displayedContinent = ref<ContinentCode>();
const displayedCountry = ref<string>();

const filteredNodes = computed<Node[]>(() => store.getters.nodes);

const isNodesLoading = computed<boolean>(() => store.getters.isNodesLoading);
const isLoadingFailed = computed<boolean>(
  () => store.getters.isNodesLoadingFailed
);

const loadMore = () => {
  if (store.getters.isMoreNodesAvailable && !store.getters.isNodesLoading) {
    store.dispatch("fetchMoreNodes", {
      countryCode: displayedCountry.value,
      continentCode: displayedContinent.value,
      query: searchString.value,
    });
  }
};

const fetchNodes = (params?: NodesSearchParameters) => {
  store.dispatch("fetchNodes", params);
};

watch(
  displayedCountry,
  (countryCode) => countryCode && fetchNodes({ country: countryCode })
);

watch(searchString, (query) => {
  store.dispatch("setFilters", {
    ...store.getters.filters,
    query,
  });
});
</script>

<style lang="scss" scoped>
.nodes-search {
  width: 100%;
  padding: 0 16px 16px;

  &__list {
    height: calc(100% - 45px);
  }
}
</style>
