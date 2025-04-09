import { createSlice } from '@reduxjs/toolkit';
import { TInitialProductState } from './types/types';

const initialState: TInitialProductState = {};

const appSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  selectors: {}
});

export const reducer = appSlice.reducer;