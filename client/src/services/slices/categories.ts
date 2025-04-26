import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialCategoryState } from "./types/types";
import { addCategoryAsync, getAllCategoriesAsync } from "@thunks/categories";
import { TCategory, TPaginatedData } from "@utils/types";
import { toggleArrayItem } from "@utils/helpers/array";

const initialState: TInitialCategoryState = {
  categories: [],
  isLoading: false,
  isAdding: false,
  isRemoving: [],
  pagination: {
    totalCount: 1,
    pageSize: 10,
    currentPage: 1,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<TCategory[]>) => {
      state.categories = payload;
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
  },
  selectors: {
    getCategoriesSelector: (state) => state.categories,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getIsRemovingSelector: (state) => state.isRemoving,
    getPaginationSelector: (state) => state.pagination,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllCategoriesAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TCategory>>) => {
          state.isLoading = false;
          state.categories = payload.items;
          state.pagination.totalCount = payload.total;
        }
      )
      .addCase(getAllCategoriesAsync.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addCategoryAsync.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addCategoryAsync.fulfilled, (state) => {
        state.isAdding = false;
      })
      .addCase(addCategoryAsync.rejected, (state) => {
        state.isAdding = false;
      });
  },
});

export const reducer = categoriesSlice.reducer;
export const {
  getCategoriesSelector,
  getIsLoadingSelector,
  getIsAddingSelector,
  getIsRemovingSelector,
  getPaginationSelector,
} = categoriesSlice.selectors;
export const { setCategories, setCurrentPage, setTotalCount, setIsRemoving } =
  categoriesSlice.actions;
