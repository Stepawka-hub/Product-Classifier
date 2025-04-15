import { createSlice } from '@reduxjs/toolkit';
import { TInitialProductState } from './types/types';

const initialState: TInitialProductState = {
  products: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  selectors: {}
});

export const reducer = productsSlice.reducer;