<template>
  <slr-modal
    class="purchase-modal"
    :open="isOpen"
    :loading="isProductsLoading || isPurchaseInProgress"
    @close="close"
  >
    <template #header>
      <span class="purchase-modal__header">
        {{ t("purchaseModal.header") }}
      </span>
    </template>

    <template #body>
      <div class="purchase-modal__body">
        <slr-loader v-if="isProductsLoading" />

        <no-data
          v-else-if="products.length === 0 && !isProductsLoading"
          :title="t('purchaseModal.body.noData')"
        />

        <template v-else>
          <div class="purchase-modal__body-header">
            {{ t("purchaseModal.body.header") }}
          </div>
          <div class="purchase-modal__products">
            <div
              v-for="(product, index) in products"
              :key="product.identifier"
              class="purchase-modal__product slr-clickable"
              :class="{
                'product-modal__product--selected': index === selectedProduct,
              }"
              @click="() => selectProduct(index)"
            >
              <div class="d-flex align-items-center">
                <input
                  v-model="selectedProduct"
                  class="purchase-modal__product-input mr-4"
                  type="radio"
                  :value="index"
                />
                <div class="purchase-modal__product-tokens">
                  {{ product.identifier.replace("dvpn_", "") }}&nbsp;DVPN&nbsp;
                </div>
              </div>
              <div class="purchase-modal__product-price">
                {{ product.localizedPriceString }}
              </div>
            </div>
          </div>

          <div v-if="selectedPrice" class="r-s11-lh13 mt-5 text-center">
            {{ t("purchaseModal.body.payment", { price: selectedPrice }) }}
          </div>
        </template>
      </div>
    </template>

    <template #footer>
      <div class="purchase-modal__buttons">
        <slr-button
          class="text-uppercase"
          :variant="'secondary'"
          :block="true"
          @click="close"
        >
          {{ t("action.cancel") }}
        </slr-button>
        <slr-button
          v-if="products.length > 0"
          class="text-uppercase"
          :variant="'primary'"
          :block="true"
          :loading="isPurchaseInProgress || isProductsLoading"
          :disabled="isPurchaseInProgress || isProductsLoading"
          @click="buyTokens"
        >
          {{ t("purchaseModal.footer.buyNow") }}
        </slr-button>
      </div>
    </template>
  </slr-modal>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import useGlobalEmitter from "@/hooks/useGlobalEmitter";
import usePurchase from "@/hooks/usePurchase";
import NoData from "@/components/app/NoData/NoData.vue";
import SlrLoader from "@/components/ui/SlrLoader/SlrLoader.vue";

const { t } = useI18n();
const emitter = useGlobalEmitter();

const {
  isProductsLoading,
  isPurchaseInProgress,
  products,
  loadProducts,
  purchaseProduct,
} = usePurchase();

const isOpen = ref<boolean>(false);
const selectedProduct = ref<number>(0);

const selectedPrice = computed<string | undefined>(
  () => products.value[selectedProduct.value]?.localizedPriceString
);

const selectProduct = (productIndex: number) => {
  selectedProduct.value = productIndex;
};

const buyTokens = () => {
  purchaseProduct(products.value[selectedProduct.value].identifier).then(close);
};

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

emitter.$on("open-purchase-modal", () => {
  open();
  loadProducts();
});
</script>

<style lang="scss" src="./PurchaseModal.scss" scoped />
