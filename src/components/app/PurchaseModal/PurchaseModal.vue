<template>
  <slr-modal
    class="purchase-modal"
    :open="isOpen"
    :loading="isProductsLoading || isPurchaseInProgress"
    @close="close"
  >
    <template #header>
      <span class="purchase-modal__header">{{
        t("purchaseModal.header")
      }}</span>
    </template>

    <template #body>
      <div class="purchase-modal__body">
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
              <div class="purchase-modal__product-dvpn">
                {{ product.identifier.replace("dvpn_", "") }}&nbsp;DVPN&nbsp;
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div
                class="purchase-modal__product-save mr-5"
                :class="{
                  'purchase-modal__product-save--faded':
                    (product.storeProduct.price /
                      products[0].storeProduct.price) *
                      100 ===
                    0,
                }"
              >
                {{
                  t("purchaseModal.body.product.save", {
                    percent:
                      (product.storeProduct.price /
                        products[0].storeProduct.price) *
                      100,
                  })
                }}
              </div>
              <div class="purchase-modal__product-price">
                <span class="purchase-modal__product-price-amount">
                  {{ product.localizedPriceString }}
                </span>
              </div>
            </div>
            <div
              v-if="index === products.length - 1"
              class="purchase-modal__product-best"
            >
              {{ t("purchaseModal.body.product.best") }}
            </div>
          </div>
        </div>

        <div class="r-s11-lh13 mt-5 text-center">
          {{ t("purchaseModal.body.payment", { price: selectedPrice }) }}
        </div>
      </div>
    </template>

    <template #footer>
      <div class="purchase-modal__buttons">
        <slr-button
          class="text-uppercase"
          :variant="'primary'"
          :large="true"
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
import { computed, onBeforeMount, ref } from "vue";
import useGlobalEmitter from "@/hooks/useGlobalEmitter";
import usePurchase from "@/hooks/usePurchase";

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
const selectedProduct = ref<number>(3);

const selectedPrice = computed<number>(() => 0);

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

onBeforeMount(() => {
  loadProducts();
});

emitter.$on("open-purchase-modal", () => open());
</script>

<style lang="scss" src="./PurchaseModal.scss" scoped />
