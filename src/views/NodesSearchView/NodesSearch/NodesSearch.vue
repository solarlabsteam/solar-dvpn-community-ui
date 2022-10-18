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
      v-else-if="!isLoadingFailed && !isNodesLoading && nodes.length === 0"
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
      :nodes="nodes"
      :select="select"
      :load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import type { ContinentCode, NodesSearchParameters } from "@/types";
import SlrLinearLoader from "@/components/ui/SlrLinearLoader";
import NodesList from "@/components/app/NodesList";
import NoData from "@/components/app/NoData";
import useConnection from "@/hooks/useConnection";
import useNodes from "@/hooks/useNodes";
import useNodesFilters from "@/hooks/useNodesFilters";

defineProps<{
  continentCode?: ContinentCode;
  countryCode?: string;
}>();

const { t } = useI18n();
const { select } = useConnection();
const {
  nodes,
  isNodesLoading,
  isNodesLoadingFailed: isLoadingFailed,
  isMoreNodesAvailable,
  loadAvailableNodes,
  loadMoreAvailableNodes,
} = useNodes();
const { filters, setFilters } = useNodesFilters();

const searchString = ref("");
const displayedContinent = ref<ContinentCode>();
const displayedCountry = ref<string>();

const loadMore = () => {
  if (isMoreNodesAvailable.value && !isNodesLoading.value) {
    loadMoreAvailableNodes({
      country: displayedCountry.value,
      continent: displayedContinent.value,
      query: searchString.value,
    });
  }
};

const fetchNodes = (params?: NodesSearchParameters) => {
  loadAvailableNodes(params);
};

watch(
  displayedCountry,
  (countryCode) => countryCode && fetchNodes({ country: countryCode })
);

watch(searchString, async (query) => {
  await setFilters({
    ...filters.value,
    query,
  });
  const { countryCode, continentCode, orderBy, minPrice, maxPrice } =
    filters.value;
  await loadAvailableNodes({
    query,
    country: countryCode,
    continent: continentCode ? (continentCode as ContinentCode) : undefined,
    minPrice: Number(minPrice) * 1e6,
    maxPrice: Number(maxPrice) * 1e6,
    orderBy,
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
