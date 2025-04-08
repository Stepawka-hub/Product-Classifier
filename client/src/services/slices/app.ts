import { createSlice } from '@reduxjs/toolkit';
import { InitialAppState } from './types/types';

const initialState: InitialAppState = {
  isInitialized: false,
}

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
  }
});

export const reducer = appSlice.reducer;
export const {
  setInitializeSuccess
} = appSlice.actions;
export const {
  getIsInitializedSelector
} = appSlice.selectors;