import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { TInitialUnitState } from "./types/types";
import { TPaginatedData, TUnit } from "@utils/types";
import { toggleArrayItem } from "@utils/helpers/array";

const initialState: TInitialUnitState = {
  units: [],
  isLoading: false,
  isAdding: false,
  isRemoving: [],
  isUpdating: [],
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
    setUnits: (state, { payload }: PayloadAction<TUnit[]>) => {
      state.units = payload;
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
    setIsUpdating: (state, { payload }: PayloadAction<string | number>) => {
      state.isUpdating = toggleArrayItem(state.isUpdating, payload);
    },
  },
  selectors: {
    getUnitsSelector: (state) => state.units,
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
      });
  },
});

export const reducer = unitsSlice.reducer;
export const {
  getUnitsSelector,
  getIsLoadingSelector,
  getIsAddingSelector,
  getIsRemovingSelector,
  getIsUpdatingSelector,
  getPaginationSelector,
} = unitsSlice.selectors;
export const { setUnits, setCurrentPage, setTotalCount, setIsRemoving } =
  unitsSlice.actions;
