<template>
  <div class="slr-input" :class="classes">
    <slot v-if="$slots['prepend']" name="prepend" />
    <input
      :type="type"
      class="slr-input__control"
      v-bind="$attrs"
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      autocapitalize="off"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useFocus from "@/hooks/useFocus";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  large: {
    type: Boolean,
    default: false,
  },
  wrapperClassName: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits<{
  (e: "update:model-value", v: string): void;
}>();

const { onFocus, onBlur, classes: focusClasses } = useFocus("slr-input");

const classes = computed(() => ({
  ...focusClasses.value,
  "slr-input--large": props.large,
  [props.wrapperClassName]: true,
}));

const onInput = (event: Event) => {
  emit("update:model-value", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" src="./SlrInput.scss" />
