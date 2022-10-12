import type { Module } from "vuex";
import { type NodesFilters, NodesOrder } from "@/types";
import { NodesFiltersMutationTypes } from "@/store/mutation-types";

interface NodesFiltersState extends NodesFilters {}

const getDefaultState = (): NodesFiltersState => ({
  query: "",
  continentCode: "any",
  countryCode: "any",
  minPrice: 0,
  maxPrice: 9999999,
  orderBy: NodesOrder.price,
});

export default {
  state: getDefaultState(),

  getters: {
    filters: (state): NodesFilters => {
      return {
        query: state.query,
        continentCode: state.continentCode,
        countryCode: state.countryCode,
        minPrice: state.minPrice,
        maxPrice: state.maxPrice,
        orderBy: state.orderBy,
      };
    },
  },

  actions: {
    async setFilters({ commit }, payload: NodesFilters): Promise<void> {
      commit(NodesFiltersMutationTypes.SET_FILTERS, payload);
    },
    async clearFilters({ commit }): Promise<void> {
      commit(NodesFiltersMutationTypes.CLEAR_FILTERS);
    },
  },

  mutations: {
    [NodesFiltersMutationTypes.SET_FILTERS](
      state,
      payload: NodesFilters
    ): void {
      state.query = payload.query;
      state.continentCode = payload.continentCode;
      state.countryCode = payload.countryCode;
      state.minPrice = payload.minPrice;
      state.maxPrice = payload.maxPrice;
      state.orderBy = payload.orderBy;
    },
    [NodesFiltersMutationTypes.CLEAR_FILTERS](state): void {
      const defaultState = getDefaultState();
      state.query = defaultState.query;
      state.continentCode = defaultState.continentCode;
      state.countryCode = defaultState.countryCode;
      state.minPrice = defaultState.minPrice;
      state.maxPrice = defaultState.maxPrice;
      state.orderBy = defaultState.orderBy;
    },
  },
} as Module<NodesFiltersState, any>;
