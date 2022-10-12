<template>
  <div class="slr-loader" :style="{ width: `${size}px`, height: `${size}px` }">
    <div class="slr-loader__bar slr-loader__bar1" />
    <div class="slr-loader__bar slr-loader__bar2" />
    <div class="slr-loader__bar slr-loader__bar3" />
    <div class="slr-loader__bar slr-loader__bar4" />
    <div class="slr-loader__bar slr-loader__bar5" />
    <div class="slr-loader__bar slr-loader__bar6" />
    <div class="slr-loader__bar slr-loader__bar7" />
    <div class="slr-loader__bar slr-loader__bar8" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size: number }>(), { size: 40 });
</script>

<style lang="scss" src="./SlrLoader.scss" scoped />
