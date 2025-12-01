import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialClassifierState } from "./types";
import {
  addClassifierAsync,
  getAllClassifiersAsync,
  getClassifierLeavesAsync,
  getChildClassifiersAsync,
  getParentClassifiersAsync,
  updateClassifierAsync,
} from "@thunks/classifiers";
import {
  TargetId,
  TClassifier,
  TClassifierShort,
  TPaginatedData,
  TProduct,
} from "@utils/types";
import { toggleArrayItem } from "@utils/helpers/array";

const initialState: TInitialClassifierState = {
  classifiers: [],
  parents: [],
  children: [],
  leaves: [],
  editingItemId: null,
  selectedItemId: null,

  isLoading: false,
  isAdding: false,
  isUpdating: false,
  removingIds: [],

  isFetchParents: false,
  isFetchChildren: false,
  isFetchLeaves: false,

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

const classifiersSlice = createSlice({
  name: "classifiers",
  initialState,
  reducers: {
    resetClassifiersState: () => initialState,
    setClassifiers: (state, { payload }: PayloadAction<TClassifier[]>) => {
      state.classifiers = payload;
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
    getClassifiersSelector: (state) => state.classifiers,
    getParentsSelector: (state) => state.parents,
    getChildrenSelector: (state) => state.children,
    getLeavesSelector: (state) => state.leaves,
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
    getIsFetchLeavesSelector: (state) => state.isFetchLeaves,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClassifiersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllClassifiersAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TClassifier>>) => {
          state.isLoading = false;
          state.classifiers = payload.items;
          state.pagination.totalCount = payload.total;
        }
      )
      .addCase(getAllClassifiersAsync.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addClassifierAsync.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addClassifierAsync.fulfilled, (state) => {
        state.isAdding = false;
      })
      .addCase(addClassifierAsync.rejected, (state) => {
        state.isAdding = false;
      })

      .addCase(updateClassifierAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateClassifierAsync.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateClassifierAsync.rejected, (state) => {
        state.isUpdating = false;
      })

      .addCase(getParentClassifiersAsync.pending, (state) => {
        state.isFetchParents = true;
      })
      .addCase(
        getParentClassifiersAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TClassifierShort>>) => {
          state.parents = payload.items;
          state.nodesPagination.totalCount = payload.total;
          state.isFetchParents = false;
        }
      )
      .addCase(getParentClassifiersAsync.rejected, (state) => {
        state.isFetchParents = false;
      })

      .addCase(getChildClassifiersAsync.pending, (state) => {
        state.isFetchChildren = true;
      })
      .addCase(
        getChildClassifiersAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TClassifierShort>>) => {
          state.children = payload.items;
          state.nodesPagination.totalCount = payload.total;
          state.isFetchChildren = false;
        }
      )
      .addCase(getChildClassifiersAsync.rejected, (state) => {
        state.isFetchChildren = false;
      })

      .addCase(getClassifierLeavesAsync.pending, (state) => {
        state.isFetchLeaves = true;
      })
      .addCase(
        getClassifierLeavesAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TProduct>>) => {
          state.leaves = payload.items;
          state.nodesPagination.totalCount = payload.total;
          state.isFetchLeaves = false;
        }
      )
      .addCase(getClassifierLeavesAsync.rejected, (state) => {
        state.isFetchLeaves = false;
      });
  },
});

export const reducer = classifiersSlice.reducer;
export const {
  getClassifiersSelector,
  getParentsSelector,
  getChildrenSelector,
  getEditingItemIdSelector,
  getSelectedItemIdSelector,
  getLeavesSelector,

  getPaginationSelector,
  getNodesPaginationSelector,
  getIsFetchLeavesSelector,

  getIsLoadingSelector,
  getIsAddingSelector,
  getIsUpdatingSelector,
  getRemovingIdsSelector,
  getIsFetchParentsSelector,
  getIsFetchChildrenSelector,
} = classifiersSlice.selectors;
export const {
  resetClassifiersState,
  setClassifiers,
  setCurrentPage,
  setNodeCurrentPage,
  setTotalCount,
  setRemovingIds,
  setEditingItemId,
  setSelectedItemId,
} = classifiersSlice.actions;
