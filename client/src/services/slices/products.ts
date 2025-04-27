import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialProductState } from "./types/types";
import { addProductAsync, getAllProductsAsync, updateProductAsync } from "@thunks/products";
import { TPaginatedData, TProduct } from "@utils/types";
import { toggleArrayItem } from "@utils/helpers/array";

const initialState: TInitialProductState = {
  products: [],

  isLoading: false,
  isAdding: false,
  isRemoving: [],

  editingItem: null,
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
    setProducts: (state, { payload }: PayloadAction<TProduct[]>) => {
      state.products = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
    setTotalCount: (state, { payload }: PayloadAction<number>) => {
      state.pagination.totalCount = payload;
    },
    setIsRemoving: (state, { payload }: PayloadAction<string | number>) => {
      state.isRemoving = toggleArrayItem(state.isRemoving, payload);
    },
    setEditingItem: (state, { payload }: PayloadAction<TProduct | null>) => {
      state.editingItem = payload;
    },
  },
  selectors: {
    getProductsSelector: (state) => state.products,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getIsRemovingSelector: (state) => state.isRemoving,
    getIsUpdatingSelector: (state) => state.isUpdating,
    getEditingItemSelector: (state) => state.editingItem,
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
  getIsRemovingSelector,
  getIsUpdatingSelector,
  getEditingItemSelector,
  getPaginationSelector,
} = productsSlice.selectors;
export const {
  setProducts,
  setCurrentPage,
  setTotalCount,
  setIsRemoving,
  setEditingItem,
} = productsSlice.actions;
