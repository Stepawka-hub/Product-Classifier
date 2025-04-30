import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addProductAsync,
  getAllProductsAsync,
  updateProductAsync,
} from "@thunks/products";
import { toggleArrayItem } from "@utils/helpers/array";
import { TargetId, TPaginatedData, TProduct } from "@utils/types";
import { TInitialProductState } from "./types/types";

const initialState: TInitialProductState = {
  products: [],

  isLoading: false,
  isAdding: false,
  removingIds: [],

  editingItemId: null,
  isUpdating: false,

  pagination: {
    totalCount: 1,
    pageSize: 10,
    currentPage: 1,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductsState: () => initialState,
    setProducts: (state, { payload }: PayloadAction<TProduct[]>) => {
      state.products = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
    setTotalCount: (state, { payload }: PayloadAction<number>) => {
      state.pagination.totalCount = payload;
    },
    setRemovingIds: (state, { payload }: PayloadAction<string | number>) => {
      state.removingIds = toggleArrayItem(state.removingIds, payload);
    },
    setEditingItemId: (state, { payload }: PayloadAction<TargetId>) => {
      state.editingItemId = payload;
    },
  },
  selectors: {
    getProductsSelector: (state) => state.products,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getRemovingIdsSelector: (state) => state.removingIds,
    getIsUpdatingSelector: (state) => state.isUpdating,
    getEditingItemIdSelector: (state) => state.editingItemId,
    getPaginationSelector: (state) => state.pagination,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllProductsAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TProduct>>) => {
          state.isLoading = false;
          state.products = payload.items;
          state.pagination.totalCount = payload.total;
        }
      )
      .addCase(getAllProductsAsync.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addProductAsync.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addProductAsync.fulfilled, (state) => {
        state.isAdding = false;
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.isAdding = false;
      })

      .addCase(updateProductAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateProductAsync.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.isUpdating = false;
      });
  },
});

export const reducer = productsSlice.reducer;
export const {
  getProductsSelector,
  getIsLoadingSelector,
  getIsAddingSelector,
  getRemovingIdsSelector,
  getIsUpdatingSelector,
  getEditingItemIdSelector,
  getPaginationSelector,
} = productsSlice.selectors;
export const {
  resetProductsState,
  setProducts,
  setCurrentPage,
  setTotalCount,
  setRemovingIds,
  setEditingItemId,
} = productsSlice.actions;
