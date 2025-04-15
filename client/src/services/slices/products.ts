import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialProductState } from "./types/types";
import { getAllProductsAsync } from "@thunks/products";
import { TProduct } from "@utils/types";

const initialState: TInitialProductState = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  selectors: {
    getProductsSelector: (state) => state.products,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllProductsAsync.fulfilled,
        (state, { payload }: PayloadAction<TProduct[]>) => {
          state.isLoading = false;
          state.products = payload;
        }
      )
      .addCase(getAllProductsAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const reducer = productsSlice.reducer;
export const { getProductsSelector } = productsSlice.selectors;
