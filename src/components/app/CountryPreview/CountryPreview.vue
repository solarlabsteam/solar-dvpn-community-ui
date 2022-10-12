<template>
  <div class="country-preview">
    <div
      class="country-preview__flag fp fp-lg"
      :class="{
        [countryCode]: true,
      }"
    />
    <div class="country-preview__info">
      <div class="country-preview__title">
        {{ countryName }}
      </div>
      <div class="country-preview__subtitle">
        {{
          t("continent.parameters.availableNode", { count: country.nodesCount })
        }}
      </div>
    </div>
    <div class="country-preview__arrow">
      <slr-icon :icon="'chevron-right'" :width="9" :height="14" />
    </div>
  </div>
</template>

<script setup lang="ts">
import lookupCountry from "country-code-lookup";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { CountryNodesInfoBase } from "@/types";

const props = defineProps<{
  country: CountryNodesInfoBase;
}>();

const { t } = useI18n();

const lookedUpCountry = computed(
  () =>
    lookupCountry.byIso(props.country.code) ||
    lookupCountry.byFips(props.country.code)
);
const countryCode = computed<string>(
  () => lookedUpCountry.value?.iso2.toLowerCase() || ""
);
const countryName = computed<string>(
  () => lookedUpCountry.value?.country || ""
);
</script>

<style lang="scss" src="./CountryPreview.scss" scoped />
