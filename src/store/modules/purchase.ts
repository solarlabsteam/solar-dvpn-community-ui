import type { Module } from "vuex";
import { PurchaseMutationTypes } from "@/store/mutation-types";
import type { Product } from "@/types";
import purchaseService from "@/services/PurchaseService";

interface PurchaseState {
  products: Product[];
  isProductsLoading: boolean;
  isPurchaseInProgress: boolean;
}

const getDefaultState = (): PurchaseState => ({
  products: [],
  isProductsLoading: false,
  isPurchaseInProgress: false,
});

export default {
  state: getDefaultState(),

  getters: {
    products: (state: PurchaseState): Product[] => state.products,
    isProductsLoading: (state: PurchaseState): boolean =>
      state.isProductsLoading,
    isPurchaseInProgress: (state: PurchaseState): boolean =>
      state.isPurchaseInProgress,
  },

  actions: {
    async fetchProducts({ commit }): Promise<void> {
      commit(PurchaseMutationTypes.SET_PRODUCTS_LOADING_STATE, true);

      try {
        const products = await purchaseService.queryDvpnProducts();
        commit(PurchaseMutationTypes.SET_PRODUCTS, products);
      } finally {
        commit(PurchaseMutationTypes.SET_PRODUCTS_LOADING_STATE, false);
      }
    },

    async purchaseProduct({ commit }, payload: string): Promise<void> {
      commit(PurchaseMutationTypes.SET_PURCHASE_IN_PROGRESS, true);

      try {
        await purchaseService.queryPurchaseProduct(payload);
      } finally {
        commit(PurchaseMutationTypes.SET_PURCHASE_IN_PROGRESS, false);
      }
    },
  },

  mutations: {
    [PurchaseMutationTypes.SET_PRODUCTS_LOADING_STATE](
      state,
      value: boolean
    ): void {
      state.isProductsLoading = value;
    },

    [PurchaseMutationTypes.SET_PRODUCTS](state, value: Product[]): void {
      state.products = value;
    },

    [PurchaseMutationTypes.SET_PURCHASE_IN_PROGRESS](
      state,
      value: boolean
    ): void {
      state.isPurchaseInProgress = value;
    },
  },
} as Module<PurchaseState, any>;
