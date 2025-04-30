import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUnitAsync, getAllUnitsAsync, updateUnitAsync } from "@thunks/units";
import { TInitialUnitState } from "./types/types";
import { TargetId, TPaginatedData, TUnit } from "@utils/types";
import { toggleArrayItem } from "@utils/helpers/array";

const initialState: TInitialUnitState = {
  units: [],

  isLoading: false,
  isAdding: false,
  removingIds: [],

  editingItemId: null,
  isUpdating: false,

  pagination: {
    totalCount: 1,
    pageSize: 10,
    currentPage: 1,
  },
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    resetUnitsState: () => initialState,
    setUnits: (state, { payload }: PayloadAction<TUnit[]>) => {
      state.units = payload;
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
    setEditingItemId: (state, { payload }: PayloadAction<TargetId>) => {
      state.editingItemId = payload;
    },
  },
  selectors: {
    getUnitsSelector: (state) => state.units,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getRemovingIdsSelector: (state) => state.removingIds,
    getIsUpdatingSelector: (state) => state.isUpdating,
    getEditingItemIdSelector: (state) => state.editingItemId,
    getPaginationSelector: (state) => state.pagination,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnitsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllUnitsAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TUnit>>) => {
          state.isLoading = false;
          state.units = payload.items;
          state.pagination.totalCount = payload.total;
        }
      )
      .addCase(getAllUnitsAsync.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addUnitAsync.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addUnitAsync.fulfilled, (state) => {
        state.isAdding = false;
      })
      .addCase(addUnitAsync.rejected, (state) => {
        state.isAdding = false;
      })

      .addCase(updateUnitAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUnitAsync.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateUnitAsync.rejected, (state) => {
        state.isUpdating = false;
      });
  },
});

export const reducer = unitsSlice.reducer;
export const {
  getUnitsSelector,
  getIsLoadingSelector,
  getIsAddingSelector,
  getRemovingIdsSelector,
  getIsUpdatingSelector,
  getEditingItemIdSelector,
  getPaginationSelector,
} = unitsSlice.selectors;
export const {
  resetUnitsState,
  setUnits,
  setCurrentPage,
  setTotalCount,
  setRemovingIds,
  setEditingItemId,
} = unitsSlice.actions;
