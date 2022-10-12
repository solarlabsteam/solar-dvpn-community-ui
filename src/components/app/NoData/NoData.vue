<template>
  <div class="no-data">
    <span class="no-data__title">{{ title }}</span>
    <span class="no-data__text">{{ text }}</span>
    <slr-button
      v-if="actionText && action"
      class="mt-5"
      :variant="'primary'"
      :light="true"
      :large="true"
      @click="action"
    >
      {{ actionText }}
    </slr-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  actionText?: string;
  action?(): void;
}>();
</script>

<style lang="scss" src="./NoData.scss" />
