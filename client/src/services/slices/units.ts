import { createSlice } from '@reduxjs/toolkit';
import { TInitialUnitState } from './types/types';

const initialState: TInitialUnitState = {
  units: []
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {},
  selectors: {}
});

export const reducer = unitsSlice.reducer;