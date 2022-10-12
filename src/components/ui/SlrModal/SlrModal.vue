<template>
  <div
    v-if="open"
    ref="maskRef"
    class="slr-modal__mask"
    tabindex="-1"
    @click.self="close"
    @keydown.self.esc="close"
  >
    <div class="slr-modal__wrapper">
      <div class="slr-modal__container">
        <div class="slr-modal__header">
          <slot name="header"> default header </slot>
          <slr-button
            v-if="!loading"
            :text="true"
            class="slr-modal__close-button"
            @click="close"
          >
            &times;
          </slr-button>
        </div>

        <div class="slr-modal__body">
          <slot name="body" />
        </div>

        <div class="slr-modal__footer">
          <slot name="footer">
            <button @click="close">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from "vue";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    loading?: boolean;
  }>(),
  {
    open: false,
    loading: false,
  }
);
const emit = defineEmits<{
  (e: "close"): void;
}>();

const maskRef = ref<HTMLElement | null>(null);

const close = () => {
  if (props.loading) return;

  emit("close");
};

watchEffect(() => {
  maskRef.value?.focus();
});
</script>

<style lang="scss" src="./SlrModal.scss" scoped />
