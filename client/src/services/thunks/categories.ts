import { api } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToast } from "@slices/toasts";
import { TCategory, TCreateCategoryData } from "@utils/types";

const GET_ALL_CATEGORIES = "categories/getAll";
const ADD_CATEGORY = "categories/add";

export const getAllCategoriesAsync = createAsyncThunk(
  GET_ALL_CATEGORIES,
  async () => {
    const res = await api.categories.getAll();
    return res;
  }
);

export const addCategoryAsync = createAsyncThunk<
  TCategory,
  TCreateCategoryData
>(ADD_CATEGORY, async (createCategoryData, { dispatch }) => {
  const res = await api.categories.create(createCategoryData);

  dispatch(
    addToast({
      message: "Категория успешно добавлена!",
      type: "success",
      duration: 2000,
    })
  );
  return res;
});
