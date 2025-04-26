import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TCategory, TCreateCategoryData, TPaginatedData } from "@utils/types";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { refreshTable } from "../helpers/pagination";
import { RootState } from "@store";
import { setIsRemoving } from '@slices/categories';

const GET_CATEGORIES = "categories/get";
const ADD_CATEGORY = "categories/add";
const DELETE_CATEGORY = "categories/delete";

export const getAllCategoriesAsync = createAsyncThunk<
  TPaginatedData<TCategory>,
  PaginationParams
>(GET_CATEGORIES, async (paginationParams) => {
  const res = await api.categories.getAll(paginationParams);
  return res;
});

export const addCategoryAsync = createAsyncThunk<void, TCreateCategoryData>(
  ADD_CATEGORY,
  async (createCategoryData, { dispatch, getState }) => {
    const res = await api.categories.createCategory(createCategoryData);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refreshTable<TCategory>(
        dispatch,
        getAllCategoriesAsync,
        state.products.pagination
      );
      dispatchSuccessToast(dispatch, "Категория успешно добавлена!");
    } else {
      return Promise.reject(res.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk<void, number>(
  DELETE_CATEGORY,
  async (id, { dispatch, getState }) => {
    dispatch(setIsRemoving(id));
    const res = await api.categories.deleteCategory(id);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refreshTable<TCategory>(
        dispatch,
        getAllCategoriesAsync,
        state.products.pagination
      );
      dispatchSuccessToast(dispatch, "Категория успешно удалена!");
    } else {
      dispatchErrorToast(dispatch, res.message);
    }

    dispatch(setIsRemoving(id));
  }
);
