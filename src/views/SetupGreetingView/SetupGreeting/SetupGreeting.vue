<template>
  <div class="setup-greeting">
    <div class="setup-greeting__info">
      <slr-icon :size="128" :icon="'logo'" />

      <p class="setup-greeting__title">
        {{ t("setup.greeting.title") }}
      </p>
      <p class="setup-greeting__text">
        {{ t("setup.greeting.text") }}
      </p>
    </div>
    <slr-button
      :block="true"
      :variant="'secondary'"
      :light="true"
      :large="true"
      @click="openSetupActionsView"
    >
      {{ t("account.getStarted") }}
    </slr-button>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import useAppRouter from "@/hooks/useAppRouter";

const { t } = useI18n();
const { openSetupActionsView } = useAppRouter();
</script>

<style scoped lang="scss">
.setup-greeting {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  text-align: center;
  width: 100%;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 71px;
    height: 90%;
  }

  &__title {
    color: var(--slr__title-txt-clr);
    @include font-template(31px, 36px, 600);
  }

  &__text {
    @include font-template(16px, 22px);
  }
}
</style>
