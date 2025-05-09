import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import {
  TCategory,
  TCategoryShort,
  TCreateCategoryData,
  TEntity,
  TPaginatedData,
  TProduct,
  TUpdateCategoryData,
} from "@utils/types";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { refreshTable } from "../helpers/pagination";
import { RootState } from "@store";
import {
  setEditingItemId,
  setRemovingIds,
  setSelectedItemId,
} from "@slices/categories";
import { AppThunkDispatch } from "./types/types";

const GET_CATEGORIES = "categories/get";
const GET_PARENT_CATEGORIES = "categories/get-parents";
const GET_CHILD_CATEGORIES = "categories/get-children";
const GET_CATEGORY_LEAVES = "categories/get-leaves";
const ADD_CATEGORY = "categories/add";
const UPDATE_CATEGORY = "categories/update";
const DELETE_CATEGORY = "categories/delete";

const refresh = (dispatch: AppThunkDispatch, state: RootState) => {
  refreshTable<TCategory>(
    dispatch,
    getAllCategoriesAsync,
    state.categories.pagination,
    setEditingItemId,
    setSelectedItemId
  );
};

export const getAllCategoriesAsync = createAsyncThunk<
  TPaginatedData<TCategory>,
  PaginationParams
>(GET_CATEGORIES, async (paginationParams) => {
  const res = await api.categories.getAll(paginationParams);
  return res;
});

export const getParentCategoriesAsync = createAsyncThunk<
  TPaginatedData<TCategoryShort>,
  PaginationParams & TEntity
>(GET_PARENT_CATEGORIES, async ({ id, page, limit }) => {
  const res = await api.categories.getParents(id, { page, limit });
  return res;
});

export const getChildCategoriesAsync = createAsyncThunk<
  TPaginatedData<TCategoryShort>,
  PaginationParams & TEntity
>(GET_CHILD_CATEGORIES, async ({ id, page, limit }) => {
  const res = await api.categories.getChildren(id, { page, limit });
  return res;
});

export const getCategoryLeavesAsync = createAsyncThunk<
  TPaginatedData<TProduct>,
  PaginationParams & TEntity
>(GET_CATEGORY_LEAVES, async ({ id, page, limit }) => {
  const res = await api.categories.getLeaves(id, { page, limit });
  return res;
});

export const addCategoryAsync = createAsyncThunk<void, TCreateCategoryData>(
  ADD_CATEGORY,
  async (createCategoryData, { dispatch, getState }) => {
    const res = await api.categories.createCategory(createCategoryData);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "Категория успешно добавлена!");
    } else {
      return Promise.reject(res.message);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk<void, TUpdateCategoryData>(
  UPDATE_CATEGORY,
  async (updateCategoryData, { dispatch, getState }) => {
    const res = await api.categories.updateCategory(updateCategoryData);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "Категория успешно обновлена!");
    } else {
      return Promise.reject(res.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk<void, number>(
  DELETE_CATEGORY,
  async (id, { dispatch, getState }) => {
    dispatch(setRemovingIds(id));
    const res = await api.categories.deleteCategory(id);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "Категория успешно удалена!");
    } else {
      dispatchErrorToast(dispatch, res.message);
    }

    dispatch(setRemovingIds(id));
  }
);
