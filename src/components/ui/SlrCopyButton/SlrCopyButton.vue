<template>
  <slr-popper
    :content="t('action.copied')"
    :show="isPopperShown"
    :offset-distance="'6'"
    :placement="placement"
    :class="wrapperClassName"
  >
    <slr-button
      v-clipboard:copy="value"
      v-clipboard:success="onCopy"
      :text="true"
      :tiny="true"
      v-bind="$attrs"
    >
      <slr-icon :width="16" :height="19" :icon="'copy'" />
    </slr-button>
  </slr-popper>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onBeforeUnmount, ref } from "vue";

withDefaults(
  defineProps<{
    value: string | number;
    placement?: string;
    wrapperClassName?: string;
  }>(),
  {
    value: "",
    placement: "right",
    wrapperClassName: "",
  }
);

const { t } = useI18n();
const isPopperShown = ref<boolean>(false);
let timer: number;

const onCopy = (): void => {
  isPopperShown.value = true;

  clearTimeout(timer);
  timer = setTimeout(() => {
    isPopperShown.value = false;
  }, 1000) as unknown as number;
};

onBeforeUnmount((): void => {
  clearTimeout(timer);
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped />
