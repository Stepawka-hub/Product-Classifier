import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TCategory, TCreateCategoryData, TPaginatedData } from "@utils/types";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { refreshTable } from "../helpers/pagination";
import { RootState } from "@store";

const GET_CATEGORIES = "categories/get";
const ADD_CATEGORY = "categories/add";

export const getAllCategoriesAsync = createAsyncThunk<
  TPaginatedData<TCategory>,
  PaginationParams
>(GET_CATEGORIES, async (paginationParams) => {
  const res = await api.categories.getAll(paginationParams);
  console.log(res);
  return res;
});

export const addCategoryAsync = createAsyncThunk<void, TCreateCategoryData>(
  ADD_CATEGORY,
  async (createCategoryData, { dispatch, getState }) => {
    const res = await api.categories.create(createCategoryData);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refreshTable<TCategory>(
        dispatch,
        getAllCategoriesAsync,
        state.products.pagination
      );
      dispatchSuccessToast(dispatch, "Категория успешно добавлена!");
    } else {
      dispatchErrorToast(dispatch, res.message);
    }
  }
);
