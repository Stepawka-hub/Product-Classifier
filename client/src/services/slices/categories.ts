import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialCategoryState } from "./types/types";
import {
  addCategoryAsync,
  getAllCategoriesAsync,
  updateCategoryAsync,
} from "@thunks/categories";
import { TCategory, TPaginatedData } from "@utils/types";
import { toggleArrayItem } from "@utils/helpers/array";

const initialState: TInitialCategoryState = {
  categories: [],
  parents: [],
  children: [],

  isLoading: false,
  isAdding: false,
  removingIds: [],
  editingItem: null,
  isUpdating: false,

  pagination: {
    totalCount: 1,
    pageSize: 10,
    currentPage: 1,
  },
  nodesPagination: {
    totalCount: 1,
    pageSize: 5,
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
    setRemovingIds: (state, { payload }: PayloadAction<string | number>) => {
      state.removingIds = toggleArrayItem(state.removingIds, payload);
    },
    setIsUpdating: (state, { payload }: PayloadAction<boolean>) => {
      state.isUpdating = payload;
    },
    setEditingItem: (state, { payload }: PayloadAction<TCategory | null>) => {
      state.editingItem = payload;
    },
  },
  selectors: {
    getCategoriesSelector: (state) => state.categories,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getRemovingIdsSelector: (state) => state.removingIds,
    getIsUpdatingSelector: (state) => state.isUpdating,
    getEditingItemSelector: (state) => state.editingItem,
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
      })

      .addCase(updateCategoryAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateCategoryAsync.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateCategoryAsync.rejected, (state) => {
        state.isUpdating = false;
      });
  },
});

export const reducer = categoriesSlice.reducer;
export const {
  getCategoriesSelector,
  getIsLoadingSelector,
  getIsAddingSelector,
  getRemovingIdsSelector,
  getIsUpdatingSelector,
  getEditingItemSelector,
  getPaginationSelector,
} = categoriesSlice.selectors;
export const {
  setCategories,
  setCurrentPage,
  setTotalCount,
  setRemovingIds,
  setEditingItem,
} = categoriesSlice.actions;
