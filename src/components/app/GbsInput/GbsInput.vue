<template>
  <div class="gbs-input">
    <div class="gbs-input__controls">
      <slr-button
        class="gbs-input__control"
        :text="true"
        @click.prevent.stop="decrease"
      >
        &minus;
      </slr-button>

      <span class="gbs-input__controls-amount">{{ gbs }} GB</span>
      <slr-button
        class="gbs-input__control"
        :text="true"
        @click.prevent.stop="increase"
      >
        &plus;
      </slr-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{ (e: "change", v: number): void }>();

const gbs = ref<number>(1);

const emitAmount = () => {
  emit("change", gbs.value);
};

const increase = () => {
  gbs.value += 1;
  emitAmount();
};

const decrease = () => {
  if (gbs.value <= 1) {
    gbs.value = 1;
    return;
  }
  gbs.value -= 1;
  emitAmount();
};
</script>

<style src="./GbsInput.scss" lang="scss" scoped />
