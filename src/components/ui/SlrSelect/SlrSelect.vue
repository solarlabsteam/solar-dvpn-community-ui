<template>
  <select class="slr-select" :value="modelValue" @change="onChange">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  options: { value: string; text: string }[];
}>();

const emit = defineEmits<{
  (e: "update:model-value", v: string): void;
}>();

const onChange = (event: Event) => {
  emit("update:model-value", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" src="./SlrSelect.scss" scoped />
