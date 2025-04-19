import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { TInitialUnitState } from "./types/types";
import { TUnit } from "@utils/types";

const initialState: TInitialUnitState = {
  units: [],
  isLoading: false,
  isAdding: false,
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    setUnits: (state, { payload }: PayloadAction<TUnit[]>) => {
      state.units = payload;
    },
  },
  selectors: {
    getUnitsSelector: (state) => state.units,
    getIsLoadingSelector: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnitsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllUnitsAsync.fulfilled,
        (state, { payload }: PayloadAction<TUnit[]>) => {
          state.isLoading = false;
          state.units = payload;
        }
      )
      .addCase(getAllUnitsAsync.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addUnitAsync.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(
        addUnitAsync.fulfilled,
        (state, { payload }: PayloadAction<TUnit>) => {
          state.isAdding = false;
          state.units = [...state.units, payload];
        }
      )
      .addCase(addUnitAsync.rejected, (state) => {
        state.isAdding = false;
      });
  },
});

export const reducer = unitsSlice.reducer;
export const { getUnitsSelector, getIsLoadingSelector } = unitsSlice.selectors;
export const { setUnits } = unitsSlice.actions;
