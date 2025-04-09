import { createAsyncThunk } from '@reduxjs/toolkit';
import { setInitializeSuccess } from '@slices/app';
import { getAllProducts } from './product';

const INITIALIZE_APP = 'app/initialize';

export const initialize = createAsyncThunk(
  INITIALIZE_APP, 
  async (_, { dispatch }) => {
    dispatch(getAllProducts());
    dispatch(setInitializeSuccess());
  }
);