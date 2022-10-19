<template>
  <slr-modal
    class="subscription-modal"
    :open="isOpen"
    :loading="isSubscribingLoading"
    @close="close"
  >
    <template #header>
      <span class="subscription-modal__header">
        {{ t("subscriptionModal.header") }}
      </span>
    </template>

    <template #body>
      <div class="subscription-modal__body">
        <node-preview v-if="!!node" :node="node" :show-price="false" />
        <gbs-input
          :price="node?.defaultPrice"
          class="subscription-modal__input"
          @change="onInput"
        />
        <div class="subscription-modal__amount r-s12-lh15">
          <div class="subscription-modal__amount-price m-s13-lh16">
            {{ formattedPrice }}
          </div>
          &nbsp;
          {{ t("subscriptionModal.priceMessage") }}
        </div>
      </div>
    </template>

    <template #footer>
      <div class="subscription-modal__buttons">
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
          :loading="isSubscribingLoading"
          :disabled="isSubscribingLoading"
          :block="true"
          @click="subscribeToNode"
        >
          {{ t("action.subscribe") }}
        </slr-button>
      </div>
    </template>
  </slr-modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import useGlobalEmitter from "@/hooks/useGlobalEmitter";
import GbsInput from "@/components/app/GbsInput";
import type { Node } from "@/types";
import NodePreview from "@/components/app/NodePreview/NodePreview.vue";
import SlrButton from "@/components/ui/SlrButton/SlrButton.vue";
import useSubscription from "@/hooks/useSubscription";
import useAppRouter from "@/hooks/useAppRouter";

const { t } = useI18n();
const emitter = useGlobalEmitter();
const { isSubscribingLoading, subscribe } = useSubscription();
const { openConnectionView } = useAppRouter();

const isOpen = ref(false);
const amountGb = ref<number>(1);
const node = ref<Node>();

const formattedPrice = computed<string>(
  () =>
    `${((node.value!.defaultPrice * amountGb.value) / 1e6).toFixed(2)} ${t(
      "node.dvpn"
    )}`
);

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const onInput = (gbs: number) => {
  amountGb.value = gbs;
};

const subscribeToNode = async () => {
  const closeModal = await subscribe(node.value!, amountGb.value);
  if (closeModal) close();
  openConnectionView();
};

emitter.$on("open-subscription-modal", (n: Node) => {
  node.value = n;
  amountGb.value = 1;
  open();
});
</script>

<style lang="scss">
.subscription-modal {
  &__header {
    font-weight: 500;
    color: var(--slr__title-txt-clr);
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__input {
    margin: 25px 0;
  }

  &__amount {
    display: flex;
    align-items: baseline;
  }

  &__amount-price {
    display: flex;
    align-items: center;
    color: var(--slr__title-txt-clr);
  }

  &__buttons {
    display: flex;
    gap: 15px;
  }
}
</style>
