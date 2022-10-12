<template>
  <div class="slr-secure-blur">
    <div
      class="slr-secure-blur__target"
      :class="{ 'slr-secure-blur__target--blurred': isBlurred }"
    >
      <slot />
    </div>

    <div v-if="isBlurred" class="slr-secure-blur__overlay">
      <div class="slr-secure-blur__button-wrapper">
        <slr-button
          :variant="'primary'"
          :light="true"
          class="slr-secure-blur__unblur-button"
          @click="unblur"
        >
          <span class="text-uppercase">{{ t("action.unblur") }}</span>
        </slr-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const isBlurred = ref<boolean>(true);

const unblur = () => {
  isBlurred.value = false;
};
</script>

<style lang="scss" scoped src="./SlrSecureBlur.scss" />
