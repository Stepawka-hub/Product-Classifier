import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@utils/api/api';

const GET_ALL_CATEGORIES = "categories/getAll";

export const getAllCategoriesAsync = createAsyncThunk(
  GET_ALL_CATEGORIES,
  async () => {
    const res = await api.getCategories();
    return res;
  }
);