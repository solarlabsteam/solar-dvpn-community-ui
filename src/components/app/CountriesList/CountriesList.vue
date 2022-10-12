<template>
  <ul class="countries-list">
    <li
      v-for="country in countries"
      :key="country.code.toLowerCase()"
      class="countries-list__item slr-clickable"
      @click.prevent.stop="() => open(country.code)"
    >
      <country-preview :country="country" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { CountryNodesInfoBase } from "@/types";
import CountryPreview from "@/components/app/CountryPreview";

defineProps<{
  countries: CountryNodesInfoBase[];
  open: (countryCode: string) => void;
}>();
</script>

<style lang="scss" src="./CountriesList.scss" />
