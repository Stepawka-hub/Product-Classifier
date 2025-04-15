import { createSlice } from '@reduxjs/toolkit';
import { TInitialAppState } from './types/types';

const initialState: TInitialAppState = {
  isInitialized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializeSuccess: (state) => {
      state.isInitialized = true
    },
  },
  selectors: {
    getIsInitializedSelector: (state) => state.isInitialized
  },
});

export const reducer = appSlice.reducer;
export const {
  setInitializeSuccess
} = appSlice.actions;
export const {
  getIsInitializedSelector
} = appSlice.selectors;