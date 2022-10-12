<template>
  <ul class="continents-list">
    <li
      v-for="(count, code) in continents"
      :key="code"
      class="continents-list__item slr-clickable"
      @click.prevent.stop="() => open(code)"
    >
      <continent-preview :code="code" :nodes-length="count" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import ContinentPreview from "@/components/app/ContinentPreview";
import type { ContinentCode, ContinentsNodesCount } from "@/types";

defineProps<{
  continents: ContinentsNodesCount;
  open: (code: ContinentCode) => void;
}>();
</script>

<style lang="scss" src="./ContinentsList.scss" />
