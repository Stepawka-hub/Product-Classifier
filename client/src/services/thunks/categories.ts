import { api } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TCategory, TCreateCategoryData, TPaginatedData } from "@utils/types";
import { dispatchSuccessToast } from "../helpers/toast";

const GET_CATEGORIES = "categories/get";
const ADD_CATEGORY = "categories/add";

export const getAllCategoriesAsync = createAsyncThunk<
  TPaginatedData<TCategory>,
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

  dispatchSuccessToast(dispatch, "Категория успешно добавлена!");

  return res;
});
