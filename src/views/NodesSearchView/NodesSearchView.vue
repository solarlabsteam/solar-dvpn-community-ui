<template>
  <slr-view>
    <template #header-nav>
      <slr-button class="r-s17-lh20" :tiny="true" :text="true" @click="back">
        {{ t("action.back") }}
      </slr-button>
    </template>
    <template #header-title>
      {{ `${t("node.list.title")}${location ? " - " : ""}${location}` }}
    </template>
    <template #header-action>
      <slr-button
        class="r-s17-lh20 mnemonic-recover-btn"
        :tiny="true"
        :text="true"
        @click="openNodesFiltersModal"
      >
        {{ t("action.filter") }}
      </slr-button>
    </template>
    <template #content>
      <nodes-search
        :continent-code="displayedContinent"
        :country-code="displayedCountry"
      />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import NodesSearch from "@/views/NodesSearchView/NodesSearch";
import { useI18n } from "vue-i18n";
import { ContinentCode, type NodesFilters } from "@/types";
import { computed, onMounted, ref, watch } from "vue";
import lookupCountry from "country-code-lookup";
import { useStore } from "vuex";
import useAppDialogs from "@/hooks/useAppDialogs";
import useAppRouter from "@/hooks/useAppRouter";

const props = defineProps<{
  continentCode?: ContinentCode;
  countryCode?: string;
}>();

const { t } = useI18n();
const { openNodesView, openNodesAvailableView } = useAppRouter();
const store = useStore();
const { openNodesFiltersModal } = useAppDialogs();

const displayedContinent = ref<ContinentCode | undefined>(props.continentCode);
const displayedCountry = ref<string | undefined>(props.countryCode);

const continentName = computed(
  () => displayedContinent.value && t(`continent.${displayedContinent.value}`)
);
const countryName = computed(
  () =>
    displayedCountry.value &&
    lookupCountry.byIso(displayedCountry.value)?.country
);
const location = computed(() => countryName.value || continentName.value || "");
const filters = computed<NodesFilters>(() => store.getters.filters);

onMounted(async () => {
  await store.dispatch("setFilters", {
    ...store.getters.filters,
    query: "",
    continentCode:
      displayedContinent.value === ContinentCode.RW || !displayedContinent.value
        ? "any"
        : displayedContinent.value,
    countryCode: displayedCountry.value || "any",
  });
});

const back = () => {
  store.dispatch("clearFilters");
  if (!props.continentCode && !props.countryCode) {
    openNodesView();
  } else {
    openNodesAvailableView(props.continentCode, props.countryCode);
  }
};

watch(filters, (filters) => {
  displayedContinent.value = filters.continentCode as ContinentCode;
  displayedCountry.value = filters.countryCode;
});
</script>
