import { createSlice } from "@reduxjs/toolkit";
import { TInitialAppState } from "./types/types";
import { clearDataAsync, fillDataAsync } from "@thunks/app";

const initialState: TInitialAppState = {
  isInitialized: false,
  isFillingData: false,
  isClearingData: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitializeSuccess: (state) => {
      state.isInitialized = true;
    },
  },
  selectors: {
    getIsInitializedSelector: (state) => state.isInitialized,
    getIsFillingDataSelector: (state) => state.isFillingData,
    getIsClearingDataSelector: (state) => state.isClearingData,
  },
  extraReducers(builder) {
    builder
      .addCase(fillDataAsync.pending, (state) => {
        state.isFillingData = true;
      })
      .addCase(fillDataAsync.fulfilled, (state) => {
        state.isFillingData = false;
      })
      .addCase(fillDataAsync.rejected, (state) => {
        state.isFillingData = false;
      })

      .addCase(clearDataAsync.pending, (state) => {
        state.isClearingData = true;
      })
      .addCase(clearDataAsync.fulfilled, (state) => {
        state.isClearingData = false;
      })
      .addCase(clearDataAsync.rejected, (state) => {
        state.isClearingData = false;
      });
  },
});

export const reducer = appSlice.reducer;
export const { setInitializeSuccess } = appSlice.actions;
export const {
  getIsInitializedSelector,
  getIsFillingDataSelector,
  getIsClearingDataSelector,
} = appSlice.selectors;
