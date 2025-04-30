import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialCategoryState } from "./types/types";
import {
  addCategoryAsync,
  getAllCategoriesAsync,
  getChildCategoriesAsync,
  getParentCategoriesAsync,
  updateCategoryAsync,
} from "@thunks/categories";
import { TargetId, TCategory, TCategoryShort, TPaginatedData } from "@utils/types";
import { toggleArrayItem } from "@utils/helpers/array";

const initialState: TInitialCategoryState = {
  categories: [],
  parents: [],
  children: [],
  editingItemId: null,
  selectedItemId: null,

  isLoading: false,
  isAdding: false,
  isUpdating: false,
  removingIds: [],

  isFetchParents: false,
  isFetchChildren: false,

  pagination: {
    totalCount: 1,
    pageSize: 10,
    currentPage: 1,
  },
  nodesPagination: {
    totalCount: 1,
    pageSize: 7,
    currentPage: 1,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategoriesState: () => initialState,
    setCategories: (state, { payload }: PayloadAction<TCategory[]>) => {
      state.categories = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
    setNodeCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.nodesPagination.currentPage = payload;
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
    setEditingItemId: (state, { payload }: PayloadAction<TargetId>) => {
      state.editingItemId = payload;
    },
    setSelectedItemId: (state, { payload }: PayloadAction<TargetId>) => {
      state.selectedItemId = payload;
    },
  },
  selectors: {
    getCategoriesSelector: (state) => state.categories,
    getParentsSelector: (state) => state.parents,
    getChildrenSelector: (state) => state.children,
    getEditingItemIdSelector: (state) => state.editingItemId,
    getSelectedItemIdSelector: (state) => state.selectedItemId,

    getPaginationSelector: (state) => state.pagination,
    getNodesPaginationSelector: (state) => state.nodesPagination,

    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getIsUpdatingSelector: (state) => state.isUpdating,
    getRemovingIdsSelector: (state) => state.removingIds,

    getIsFetchParentsSelector: (state) => state.isFetchParents,
    getIsFetchChildrenSelector: (state) => state.isFetchChildren,
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
      })

      .addCase(getParentCategoriesAsync.pending, (state) => {
        state.isFetchParents = true;
      })
      .addCase(
        getParentCategoriesAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TCategoryShort>>) => {
          state.parents = payload.items;
          state.nodesPagination.totalCount = payload.total;
          state.isFetchParents = false;
        }
      )
      .addCase(getParentCategoriesAsync.rejected, (state) => {
        state.isFetchParents = false;
      })

      .addCase(getChildCategoriesAsync.pending, (state) => {
        state.isFetchChildren = true;
      })
      .addCase(
        getChildCategoriesAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TCategoryShort>>) => {
          state.children = payload.items;
          state.nodesPagination.totalCount = payload.total;
          state.isFetchChildren = false;
        }
      )
      .addCase(getChildCategoriesAsync.rejected, (state) => {
        state.isFetchChildren = false;
      });
  },
});

export const reducer = categoriesSlice.reducer;
export const {
  getCategoriesSelector,
  getParentsSelector,
  getChildrenSelector,
  getEditingItemIdSelector,
  getSelectedItemIdSelector,

  getPaginationSelector,
  getNodesPaginationSelector,

  getIsLoadingSelector,
  getIsAddingSelector,
  getIsUpdatingSelector,
  getRemovingIdsSelector,
  getIsFetchParentsSelector,
  getIsFetchChildrenSelector,
} = categoriesSlice.selectors;
export const {
  resetCategoriesState,
  setCategories,
  setCurrentPage,
  setNodeCurrentPage,
  setTotalCount,
  setRemovingIds,
  setEditingItemId,
  setSelectedItemId,
} = categoriesSlice.actions;
