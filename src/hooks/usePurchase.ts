import type { Product } from "@/types";
import { useStore } from "vuex";
import { computed, type ComputedRef } from "vue";

export default function usePurchase(): {
  products: ComputedRef<Product[]>;
  isProductsLoading: ComputedRef<boolean>;
  isPurchaseInProgress: ComputedRef<boolean>;
  loadProducts(): Promise<void>;
  purchaseProduct(id: string): Promise<void>;
} {
  const store = useStore();

  const products = computed<Product[]>(() => store.getters.products);
  const isProductsLoading = computed<boolean>(
    () => store.getters.isProductsLoading
  );
  const isPurchaseInProgress = computed<boolean>(
    () => store.getters.isPurchaseInProgress
  );

  const loadProducts = async (): Promise<void> => {
    await store.dispatch("fetchProducts");
  };

  const purchaseProduct = async (id: string): Promise<void> => {
    await store.dispatch("purchaseProduct", id);
  };

  return {
    products,
    isProductsLoading,
    isPurchaseInProgress,
    loadProducts,
    purchaseProduct,
  };
}
