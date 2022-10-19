<template>
  <slr-modal
    class="unsubscription-modal"
    :open="isOpen"
    :loading="isUnsubscriptionLoading"
    @close="close"
  >
    <template #header>
      <span class="unsubscription-modal__header">
        {{ t("unsubscriptionModal.header") }}
      </span>
    </template>

    <template #body>
      <div class="unsubscription-modal__body">
        {{
          t("unsubscriptionModal.message", {
            name: node?.moniker || t("node.unavailable"),
          })
        }}
      </div>
    </template>

    <template #footer>
      <div class="unsubscription-modal__buttons">
        <slr-button
          class="text-uppercase"
          :variant="'secondary'"
          :block="true"
          @click="close"
        >
          {{ t("action.cancel") }}
        </slr-button>
        <slr-button
          class="text-uppercase"
          :variant="'primary'"
          :loading="isUnsubscriptionLoading"
          :disabled="isUnsubscriptionLoading"
          :block="true"
          @click="unsubscribeFromNode"
        >
          {{ t("action.unsubscribe") }}
        </slr-button>
      </div>
    </template>
  </slr-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import useGlobalEmitter from "@/hooks/useGlobalEmitter";
import type { Node } from "@/types";
import SlrButton from "@/components/ui/SlrButton/SlrButton.vue";
import useSubscription from "@/hooks/useSubscription";

const { t } = useI18n();
const emitter = useGlobalEmitter();
const { isUnsubscriptionLoading, unsubscribe } = useSubscription();

const isOpen = ref(false);
const node = ref<Node>();

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const unsubscribeFromNode = async () => {
  await unsubscribe(node.value!);
  close();
};

emitter.$on("open-unsubscription-modal", (n: Node) => {
  node.value = n;
  open();
});
</script>

<style lang="scss">
.unsubscription-modal {
  &__header {
    font-weight: 500;
    color: var(--slr__title-txt-clr);
  }

  &__body {
    @include font-template(15px, 20px);
  }

  &__buttons {
    display: flex;
    gap: 15px;
  }
}
</style>
