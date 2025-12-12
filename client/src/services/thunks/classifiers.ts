import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import {
  TClassifier,
  TClassifierShort,
  TCreateClassifierData,
  TEntity,
  TPaginatedData,
  TUpdateClassifierData,
} from "@utils/types";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { refreshTable } from "../helpers/pagination";
import { RootState } from "@store";
import { setSelectedItemId } from "@slices/classifiers";
import { AppThunkDispatch } from "./types/types";

const GET_CLASSIFIERS = "classifiers/get";
const GET_PARENT_CLASSIFIERS = "classifiers/get-parents";
const GET_CHILD_CLASSIFIERS = "classifiers/get-children";
const ADD_CLASSIFIER = "classifiers/add";
const UPDATE_CLASSIFIER = "classifiers/update";
const DELETE_CLASSIFIER = "classifiers/delete";

const refresh = (dispatch: AppThunkDispatch, state: RootState) => {
  refreshTable<TClassifier>(
    dispatch,
    getAllClassifiersAsync,
    state.classifiers.pagination,
    setSelectedItemId
  );
};

export const getAllClassifiersAsync = createAsyncThunk<
  TPaginatedData<TClassifier>,
  PaginationParams
>(GET_CLASSIFIERS, async (paginationParams) => {
  const res = await api.classifiers.getAll(paginationParams);
  return res;
});

export const getParentClassifiersAsync = createAsyncThunk<
  TPaginatedData<TClassifierShort>,
  PaginationParams & TEntity
>(GET_PARENT_CLASSIFIERS, async ({ id, page, limit }) => {
  const res = await api.classifiers.getParents(id, { page, limit });
  return res;
});

export const getChildClassifiersAsync = createAsyncThunk<
  TPaginatedData<TClassifierShort>,
  PaginationParams & TEntity
>(GET_CHILD_CLASSIFIERS, async ({ id, page, limit }) => {
  const res = await api.classifiers.getChildren(id, { page, limit });
  return res;
});

export const addClassifierAsync = createAsyncThunk<void, TCreateClassifierData>(
  ADD_CLASSIFIER,
  async (createClassifierData, { dispatch, getState }) => {
    const res = await api.classifiers.createClassifier(createClassifierData);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "Классификатор успешно добавлен!");
    } else {
      return Promise.reject(res.message);
    }
  }
);

export const updateClassifierAsync = createAsyncThunk<
  void,
  TUpdateClassifierData
>(UPDATE_CLASSIFIER, async (updateClassifierData, { dispatch, getState }) => {
  const res = await api.classifiers.updateClassifier(updateClassifierData);

  if (res.resultCode === SUCCESS_CODE) {
    const state = getState() as RootState;
    refresh(dispatch, state);
    dispatchSuccessToast(dispatch, "Классификатор успешно обновлен!");
  } else {
    return Promise.reject(res.message);
  }
});

export const deleteClassifierAsync = createAsyncThunk<void, number>(
  DELETE_CLASSIFIER,
  async (id, { dispatch, getState }) => {
    const res = await api.classifiers.deleteClassifier(id);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "Классификатор успешно удалён!");
    } else {
      dispatchErrorToast(dispatch, res.message);
    }
  }
);
