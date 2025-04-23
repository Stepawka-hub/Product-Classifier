import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { TInitialUnitState } from "./types/types";
import { TPaginatedData, TUnit } from "@utils/types";

const initialState: TInitialUnitState = {
  units: [],
  isLoading: false,
  isAdding: false,
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
  },
  selectors: {
    getUnitsSelector: (state) => state.units,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAddingSeletor: (state) => state.isAdding,
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
  getIsAddingSeletor,
  getPaginationSelector,
} = unitsSlice.selectors;
export const { setUnits, setCurrentPage, setTotalCount } = unitsSlice.actions;
