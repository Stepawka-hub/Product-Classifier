import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@utils/api/api';

const GET_ALL_UNITS = "units/getAll";

export const getAllUnitsAsync = createAsyncThunk(
  GET_ALL_UNITS,
  async () => {
    const res = await api.getUnits();
    return res;
  }
);