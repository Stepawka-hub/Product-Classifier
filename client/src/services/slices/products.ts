import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addProductAsync,
  calculateTotalConsumptionAsync,
  changeProductVersionAsync,
  deleteProductAsync,
  getAllProductsAsync,
  updateProductAsync,
} from "@thunks/products";
import {
  TargetId,
  TPaginatedData,
  TProduct,
  TProductComponent,
} from "@utils/types";
import { TInitialProductState } from "./types/types";

const initialState: TInitialProductState = {
  products: [],
  selectedItemId: null,

  isLoading: false,
  isAdding: false,
  isRemoving: false,
  isUpdating: false,
  isChangingVersion: false,
  isAddingModification: false,

  pagination: {
    totalCount: 1,
    pageSize: 10,
    currentPage: 1,
  },

  isCalculating: false,
  consumptionCalculation: [],
  consumptionPagination: {
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
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
    setConsumptionCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.consumptionPagination.currentPage = payload;
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
    getIsChangingVersion: (state) => state.isChangingVersion,
    getIsAddingModification: (state) => state.isAddingModification,
    getIsCalculating: (state) => state.isCalculating,
    getConsumptionCalculation: (state) => state.consumptionCalculation,
    getPaginationSelector: (state) => state.pagination,
    getConsumptionPagination: (state) => state.consumptionPagination,
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
      })

      .addCase(calculateTotalConsumptionAsync.pending, (state) => {
        state.isCalculating = true;
      })
      .addCase(
        calculateTotalConsumptionAsync.fulfilled,
        (
          state,
          { payload }: PayloadAction<TPaginatedData<TProductComponent>>
        ) => {
          state.isCalculating = false;
          state.consumptionCalculation = payload.items;
          state.consumptionPagination.totalCount = payload.total;
        }
      )
      .addCase(calculateTotalConsumptionAsync.rejected, (state) => {
        state.isCalculating = false;
      })

      .addCase(changeProductVersionAsync.pending, (state) => {
        state.isChangingVersion = true;
      })
      .addCase(changeProductVersionAsync.fulfilled, (state) => {
        state.isChangingVersion = false;
      })
      .addCase(changeProductVersionAsync.rejected, (state) => {
        state.isChangingVersion = false;
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
  getIsChangingVersion,
  getIsAddingModification,
  getIsCalculating,
  getPaginationSelector,
  getConsumptionPagination,
  getSelectedItemIdSelector,
  getConsumptionCalculation,
} = productsSlice.selectors;
export const {
  resetProductsState,
  setCurrentPage,
  setConsumptionCurrentPage,
  setTotalCount,
  setSelectedItemId,
} = productsSlice.actions;
