<template>
  <slr-input
    :wrapper-class-name="'slr-search-input'"
    :model-value="modelValue"
    @update:model-value="onInput"
  />
</template>

<script>
import debounce from "lodash.debounce";

export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:model-value", "search"],

  setup(props, { emit }) {
    const onInput = debounce((str) => emit("update:model-value", str), 300);

    return { onInput };
  },
};
</script>

<style lang="scss" src="./SlrSearchInput.scss" />
