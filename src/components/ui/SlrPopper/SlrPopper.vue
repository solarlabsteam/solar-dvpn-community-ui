<template>
  <popper class="slr-popper">
    <slot />
  </popper>
</template>

<script lang="ts" setup>
import Popper from "vue3-popper";
</script>

<style lang="scss" src="./SlrPopper.scss" scoped />
