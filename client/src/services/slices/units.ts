import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addUnitAsync,
  deleteUnitAsync,
  getAllUnitsAsync,
  updateUnitAsync,
} from "@thunks/units";
import { TInitialUnitState } from "./types";
import { TargetId, TPaginatedData, TUnit } from "@utils/types";

const initialState: TInitialUnitState = {
  units: [],
  selectedItemId: null,

  isLoading: false,
  isAdding: false,
  isRemoving: false,
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
    setSelectedItemId: (state, { payload }: PayloadAction<TargetId>) => {
      state.selectedItemId = payload;
    },
  },
  selectors: {
    getUnitsSelector: (state) => state.units,
    getSelectedItemIdSelector: (state) => state.selectedItemId,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSelector: (state) => state.isAdding,
    getIsRemovingSelector: (state) => state.isRemoving,
    getIsUpdatingSelector: (state) => state.isUpdating,
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
      })

      .addCase(deleteUnitAsync.pending, (state) => {
        state.isRemoving = true;
      })
      .addCase(deleteUnitAsync.fulfilled, (state) => {
        state.isRemoving = false;
      })
      .addCase(deleteUnitAsync.rejected, (state) => {
        state.isRemoving = false;
      });
  },
});

export const reducer = unitsSlice.reducer;
export const {
  getUnitsSelector,
  getIsLoadingSelector,
  getIsAddingSelector,
  getIsUpdatingSelector,
  getIsRemovingSelector,
  getPaginationSelector,
  getSelectedItemIdSelector,
} = unitsSlice.selectors;
export const {
  resetUnitsState,
  setUnits,
  setCurrentPage,
  setTotalCount,
  setSelectedItemId,
} = unitsSlice.actions;
