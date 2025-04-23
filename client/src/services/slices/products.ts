import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialProductState } from "./types/types";
import { addProductAsync, getAllProductsAsync } from "@thunks/products";
import { TPaginatedData, TProduct } from "@utils/types";

const initialState: TInitialProductState = {
  products: [],
  isLoading: false,
  isAdding: false,
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
  },
  selectors: {
    getProductsSelector: (state) => state.products,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSeletor: (state) => state.isAdding,
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
      });
  },
});

export const reducer = productsSlice.reducer;
export const {
  getProductsSelector,
  getIsLoadingSelector,
  getIsAddingSeletor,
  getPaginationSelector,
} = productsSlice.selectors;
export const { setProducts, setCurrentPage, setTotalCount } =
  productsSlice.actions;
