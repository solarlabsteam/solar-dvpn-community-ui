<template>
  <slr-modal class="nodes-filters-modal" :open="isOpen" @close="close">
    <template #header>
      <span class="b-s17-lh20">{{ t("nodesFiltersModal.header") }}</span>
    </template>
    <template #body>
      <div class="nodes-filters-modal__select mb-4">
        <span class="mb-3">{{ t("nodesFiltersModal.body.continent") }}</span>
        <slr-select
          :model-value="continent || 'any'"
          :options="continents"
          @update:model-value="onContinentUpdate"
        />
      </div>
      <div class="nodes-filters-modal__select mb-4">
        <span class="mb-3">{{ t("nodesFiltersModal.body.country") }}</span>
        <slr-select
          :options="countries"
          :model-value="country || 'any'"
          @update:model-value="onCountryUpdate"
        />
      </div>
      <div class="nodes-filters-modal__select-group mb-4">
        <div class="nodes-filters-modal__select">
          <span class="mb-3">{{ t("nodesFiltersModal.body.minPrice") }}</span>
          <slr-input
            :model-value="minPrice?.toString()"
            @update:model-value="onMinPriceUpdate"
          />
        </div>
        <div class="nodes-filters-modal__select">
          <span class="mb-3">{{ t("nodesFiltersModal.body.maxPrice") }}</span>
          <slr-input
            :model-value="maxPrice?.toString()"
            @update:model-value="onMaxPriceUpdate"
          />
        </div>
      </div>
      <div class="nodes-filters-modal__select">
        <span class="mb-3">{{ t("nodesFiltersModal.body.orderBy") }}</span>
        <slr-select
          :options="orders"
          :model-value="order?.toString() || NodesOrder.price.toString()"
          @update:model-value="onOrderUpdate"
        />
      </div>
    </template>
    <template #footer>
      <div class="nodes-filters-modal__controls mt-4">
        <slr-button
          class="text-capitalize"
          :variant="'primary'"
          :large="true"
          :block="true"
          @click="applyFilters"
        >
          {{ t("nodesFiltersModal.applyFilters") }}
        </slr-button>
      </div>
    </template>
  </slr-modal>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import lookupCountry from "country-code-lookup";
import SlrModal from "@/components/ui/SlrModal";
import useGlobalEmitter from "@/hooks/useGlobalEmitter";
import SlrSelect from "@/components/ui/SlrSelect";
import {
  ContinentCode,
  NodesOrder,
  type CountryNodesInfo,
  type NodesFilters,
  type Option,
} from "@/types";
import SlrInput from "@/components/ui/SlrInput/SlrInput.vue";
import useNodes from "@/hooks/useNodes";
import useNodesFilters from "@/hooks/useNodesFilters";

const { t } = useI18n();
const emitter = useGlobalEmitter();
const { continents: continentsInfo, loadAvailableNodes } = useNodes();
const { filters, setFilters } = useNodesFilters();

const isOpen = ref<boolean>(false);
const continent = ref<string>();
const country = ref<string>();
const minPrice = ref<number>();
const maxPrice = ref<number>();
const order = ref<NodesOrder>();
const query = ref<string>();

const countries = computed<Option[]>(() => {
  const defaultValue: Option = { value: "any", text: "Any countries" };

  return [
    defaultValue,
    ...(continentsInfo.value?.countries || [])
      .filter(
        (country: CountryNodesInfo) =>
          continent.value === "any" || country.continentCode === continent.value
      )
      .map((country) => ({
        value: country.code.toLowerCase(),
        text: lookupCountry.byIso(country.code)?.country || "",
      })),
  ];
});

const continents: Option[] = [{ value: "any", text: "Any continents" }];
Object.keys(ContinentCode).forEach((code) => {
  if (code !== ContinentCode.RW) {
    continents.push({ value: code, text: t(`continent.${code}`) });
  }
});

const orders = Object.keys(NodesOrder).map((order) => ({
  value: NodesOrder[order as keyof typeof NodesOrder],
  text: t(`node.parameters.${order}`),
}));

watch(
  () => continent.value,
  (_, prev) => {
    if (prev) {
      country.value = "any";
    }
  }
);

const open = () => {
  query.value = filters.value.query;
  continent.value = filters.value.continentCode;
  country.value = filters.value.countryCode;
  minPrice.value = filters.value.minPrice;
  maxPrice.value = filters.value.maxPrice;
  order.value = filters.value.orderBy;

  isOpen.value = true;
};

const close = () => {
  query.value = undefined;
  continent.value = undefined;
  country.value = undefined;
  minPrice.value = undefined;
  maxPrice.value = undefined;
  order.value = undefined;

  isOpen.value = false;
};

const applyFilters = async () => {
  await setFilters({
    query: query.value,
    countryCode: country.value,
    continentCode: continent.value,
    minPrice: Number(minPrice.value),
    maxPrice: Number(maxPrice.value),
    orderBy: order.value,
  } as NodesFilters);
  await loadAvailableNodes({
    query: query.value,
    country: country.value === "any" ? undefined : country.value,
    continent:
      continent.value === "any"
        ? undefined
        : (continent.value as ContinentCode),
    minPrice: Number(minPrice.value) * 1e6,
    maxPrice: Number(maxPrice.value) * 1e6,
    orderBy: order.value,
  });

  isOpen.value = false;
};

const onContinentUpdate = (value: string) => {
  continent.value = value;
};

const onCountryUpdate = (value: string) => {
  country.value = value;
};

const onMinPriceUpdate = (value: string) => {
  minPrice.value = Number(value);
};

const onMaxPriceUpdate = (value: string) => {
  maxPrice.value = Number(value);
};

const onOrderUpdate = (value: string) => {
  order.value = value as NodesOrder;
};

emitter.$on("open-nodes-filters-modal", open);
</script>

<style lang="scss" src="./NodesFiltersModal.scss" scoped />
