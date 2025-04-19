import { api } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToast } from "@slices/toasts";
import { PaginationParams, TPaginatedResponse } from "@utils/api/types/types";
import { TCategory, TCreateCategoryData } from "@utils/types";

const GET_CATEGORIES = "categories/get";
const ADD_CATEGORY = "categories/add";

export const getAllCategoriesAsync = createAsyncThunk<
  TPaginatedResponse<TCategory>,
  PaginationParams
>(GET_CATEGORIES, async (paginationParams) => {
  const res = await api.categories.getAll(paginationParams);
  return res;
});

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
