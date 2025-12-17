import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialClassifierState } from "./types";
import {
  addClassifierAsync,
  getAllClassifiersAsync,
  getChildClassifiersAsync,
  getParentClassifiersAsync,
  updateClassifierAsync,
  deleteClassifierAsync,
} from "@thunks/classifiers";
import {
  TargetId,
  TClassifier,
  TClassifierShort,
  TPaginatedData,
} from "@utils/types";

const initialState: TInitialClassifierState = {
  classifiers: [],
  parents: [],
  children: [],
  selectedItemId: null,

  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isRemoving: false,

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
      state.selectedItemId = null;
    },
    setNodeCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.nodesPagination.currentPage = payload;
    },
    setTotalCount: (state, { payload }: PayloadAction<number>) => {
      state.pagination.totalCount = payload;
    },
    setSelectedItemId: (state, { payload }: PayloadAction<TargetId>) => {
      state.selectedItemId = payload;
    },
  },
  selectors: {
    getClassifiersSelector: (state) => state.classifiers,
    getParentsSelector: (state) => state.parents,
    getChildrenSelector: (state) => state.children,
    getSelectedItemIdSelector: (state) => state.selectedItemId,

    getPaginationSelector: (state) => state.pagination,
    getNodesPaginationSelector: (state) => state.nodesPagination,

    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getIsUpdatingSelector: (state) => state.isUpdating,
    getIsRemovingSelector: (state) => state.isRemoving,

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

      .addCase(deleteClassifierAsync.pending, (state) => {
        state.isRemoving = true;
      })
      .addCase(deleteClassifierAsync.fulfilled, (state) => {
        state.isRemoving = false;
      })
      .addCase(deleteClassifierAsync.rejected, (state) => {
        state.isRemoving = false;
      })

      .addCase(getParentClassifiersAsync.pending, (state) => {
        state.isFetchParents = true;
      })
      .addCase(
        getParentClassifiersAsync.fulfilled,
        (
          state,
          { payload }: PayloadAction<TPaginatedData<TClassifierShort>>
        ) => {
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
        (
          state,
          { payload }: PayloadAction<TPaginatedData<TClassifierShort>>
        ) => {
          state.children = payload.items;
          state.nodesPagination.totalCount = payload.total;
          state.isFetchChildren = false;
        }
      )
      .addCase(getChildClassifiersAsync.rejected, (state) => {
        state.isFetchChildren = false;
      });
  },
});

export const reducer = classifiersSlice.reducer;
export const {
  getClassifiersSelector,
  getParentsSelector,
  getChildrenSelector,
  getSelectedItemIdSelector,

  getPaginationSelector,
  getNodesPaginationSelector,

  getIsLoadingSelector,
  getIsAddingSelector,
  getIsUpdatingSelector,
  getIsRemovingSelector,
  getIsFetchParentsSelector,
  getIsFetchChildrenSelector,
} = classifiersSlice.selectors;
export const {
  resetClassifiersState,
  setClassifiers,
  setCurrentPage,
  setNodeCurrentPage,
  setTotalCount,
  setSelectedItemId,
} = classifiersSlice.actions;
