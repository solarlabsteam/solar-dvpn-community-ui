<template>
  <div class="slr-view">
    <div
      class="slr-view__header"
      v-if="
        $slots['header-nav'] ||
        $slots['header-title'] ||
        $slots['header-action']
      "
    >
      <div class="slr-view__header-nav">
        <slot name="header-nav" />
      </div>
      <div class="slr-view__header-title">
        <slot name="header-title" />
      </div>
      <div class="slr-view__header-action">
        <slot name="header-action" />
      </div>
    </div>
    <div
      class="slr-view__content"
      :style="{
        // height:
        //   $slots['header-nav'] ||
        //   $slots['header-title'] ||
        //   $slots['header-action']
        //     ? '92%'
        //     : '100%',
      }"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.slr-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    flex: 0;
    height: 56px;
  }

  &__header-nav {
    flex-basis: 20%;
  }

  &__header-title {
    color: var(--slr__title-txt-clr);
    flex-basis: 60%;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @include font-template(17px, 22px, 500);
  }

  &__header-action {
    flex-basis: 20%;
    text-align: right;
  }

  &__content {
    display: flex;
    flex: 1;
    height: calc(100% - 56px);
  }
}
</style>
