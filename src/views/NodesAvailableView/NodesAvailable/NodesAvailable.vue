<template>
  <div class="nodes-available">
    <slr-linear-loader v-if="isNodesLoading" class="available-nodes__loader" />

    <countries-list
      v-else-if="!countryCode"
      :countries="countryNodesCount"
      :open="openCountry"
    />

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
      :nodes="filteredNodes"
      :select="select"
      :load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { computed, watch } from "vue";
import type {
  ContinentCode,
  ContinentsInfo,
  CountryNodesInfo,
  Node,
  NodesSearchParameters,
} from "@/types";
import SlrLinearLoader from "@/components/ui/SlrLinearLoader";
import NodesList from "@/components/app/NodesList";
import CountriesList from "@/components/app/CountriesList";
import NoData from "@/components/app/NoData";
import useConnection from "@/hooks/useConnection";
import useAppRouter from "@/hooks/useAppRouter";

const props = defineProps<{
  continentCode?: ContinentCode;
  countryCode?: string;
}>();

const store = useStore();
const { t } = useI18n();
const { openNodesAvailableView } = useAppRouter();
const { select } = useConnection();

const filteredNodes = computed<Node[]>(() => store.getters.nodes);
const continents = computed<ContinentsInfo>(() => store.getters.continents);
const countryNodesCount = computed<CountryNodesInfo[]>(
  () =>
    continents.value?.countries.filter(
      (country) => country.continentCode === props.continentCode
    ) || []
);
const isNodesLoading = computed<boolean>(() => store.getters.isNodesLoading);
const isLoadingFailed = computed<boolean>(
  () => store.getters.isNodesLoadingFailed
);

const openCountry = (code: string) => {
  openNodesAvailableView(props.continentCode, code);
};

const loadMore = () => {
  if (store.getters.isMoreNodesAvailable && !store.getters.isNodesLoading) {
    store.dispatch("fetchMoreNodes", {
      country: props.countryCode,
      continent: props.continentCode,
    });
  }
};

const fetchNodes = (params?: NodesSearchParameters) => {
  store.dispatch("fetchNodes", params);
};

watch(
  () => props.countryCode,
  (countryCode) => countryCode && fetchNodes({ country: countryCode })
);
</script>

<style lang="scss" src="./NodesAvailable.scss" />
