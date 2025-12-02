import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addProductAsync,
  deleteProductAsync,
  getAllProductsAsync,
  updateProductAsync,
} from "@thunks/products";
import { TargetId, TPaginatedData, TProduct } from "@utils/types";
import { TInitialProductState } from "./types/types";

const initialState: TInitialProductState = {
  products: [],
  selectedItemId: null,

  isLoading: false,
  isAdding: false,
  isRemoving: false,
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
    setSelectedItemId: (state, { payload }: PayloadAction<TargetId>) => {
      state.selectedItemId = payload;
    },
  },
  selectors: {
    getProductsSelector: (state) => state.products,
    getSelectedItemIdSelector: (state) => state.selectedItemId,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getIsRemovingSelector: (state) => state.isRemoving,
    getIsUpdatingSelector: (state) => state.isUpdating,
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
      })

      .addCase(deleteProductAsync.pending, (state) => {
        state.isRemoving = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state) => {
        state.isRemoving = false;
      })
      .addCase(deleteProductAsync.rejected, (state) => {
        state.isRemoving = false;
      });
  },
});

export const reducer = productsSlice.reducer;
export const {
  getProductsSelector,
  getIsLoadingSelector,
  getIsAddingSelector,
  getIsUpdatingSelector,
  getIsRemovingSelector,
  getPaginationSelector,
  getSelectedItemIdSelector,
} = productsSlice.selectors;
export const {
  resetProductsState,
  setProducts,
  setCurrentPage,
  setTotalCount,
  setSelectedItemId,
} = productsSlice.actions;
