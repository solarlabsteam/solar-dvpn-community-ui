<template>
  <div class="setup-complete">
    <div class="setup-complete__info">
      <slr-icon :icon="'check-circle'" :size="100" class="mb-5" />

      <p class="setup-complete__title">
        {{ t("setup.complete.title") }}
      </p>

      <p class="setup-complete__text">
        {{ t("setup.complete.text") }}
      </p>
    </div>

    <slr-button
      :block="true"
      :variant="'primary'"
      :light="true"
      :large="true"
      @click="close"
    >
      {{ t("setup.complete.continue") }}
    </slr-button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import useAppRouter from "@/hooks/useAppRouter";

const { t } = useI18n();
const { openConnectionView } = useAppRouter();

const close = () => {
  openConnectionView();
};
</script>

<style scoped lang="scss">
.setup-complete {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  height: 100%;
  text-align: center;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__title {
    margin-bottom: 13px;
    color: var(--slr__title-txt-clr);
    @include font-template(28px, 34px, 500);
  }

  &__text {
    @include font-template(16px, 22px);
  }
}
</style>
