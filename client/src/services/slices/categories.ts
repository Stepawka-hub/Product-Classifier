import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialCategoryState } from "./types/types";
import { getAllCategoriesAsync } from "@thunks/categories";
import { TCategory } from '@utils/types';

const initialState: TInitialCategoryState = {
  categories: [],
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  selectors: {
    getCategoriesSelector: (state) => state.categories,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllCategoriesAsync.fulfilled,
        (state, { payload }: PayloadAction<TCategory[]>) => {
          state.isLoading = false;
          state.categories = payload;
        }
      )
      .addCase(getAllCategoriesAsync.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const reducer = categoriesSlice.reducer;
