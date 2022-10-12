<template>
  <div class="settings-section">
    <div class="settings-section__content">
      <div class="settings-section__header" v-if="title || subtitle">
        <div class="settings-section__header-title">{{ title }}</div>
        <div class="settings-section__header-subtitle">{{ subtitle }}</div>
      </div>
      <div class="mb-3" v-if="$slots['content']">
        <slot name="content" />
      </div>
    </div>
    <div class="settings-section__buttons" v-if="$slots['buttons']">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<style lang="scss" src="./SettingsSection.scss" />
