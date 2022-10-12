<template>
  <p class="slr-clipboard-text">
    <slot>
      {{ text }}
    </slot>

    <slr-copy-button :value="text" :placement="placement" />
  </p>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string;
    placement?: string;
  }>(),
  {
    text: "",
    placement: "right",
  }
);
</script>

<style lang="scss" src="./SlrClipboardText.scss" scoped />
