import { createSlice } from '@reduxjs/toolkit';
import { TInitialCategoryState } from './types/types';

const initialState: TInitialCategoryState = {
  categories: []
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  selectors: {}
});

export const reducer = categoriesSlice.reducer;