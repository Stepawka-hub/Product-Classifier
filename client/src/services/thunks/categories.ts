import { api } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const GET_ALL_CATEGORIES = "categories/getAll";

export const getAllCategoriesAsync = createAsyncThunk(
  GET_ALL_CATEGORIES,
  async () => {
    const res = await api.categories.getAll();
    return res;
  }
);