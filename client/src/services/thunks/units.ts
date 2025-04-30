import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setEditingItem, setRemovingIds } from "@slices/units";
import { RootState } from "@store";
import { PaginationParams } from "@utils/api/types/types";
import {
  TCreateUnitData,
  TPaginatedData,
  TUnit,
  TUpdateUnitData,
} from "@utils/types";
import { refreshTable } from "../helpers/pagination";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { AppThunkDispatch } from "./types/types";

const GET_UNITS = "units/get";
const ADD_UNIT = "units/add";
const UPDATE_UNIT = "units/update";
const DELETE_UNIT = "units/delete";

const refresh = (dispatch: AppThunkDispatch, state: RootState) => {
  refreshTable<TUnit>(
    dispatch,
    getAllUnitsAsync,
    state.units.pagination,
    setEditingItem
  );
};

export const getAllUnitsAsync = createAsyncThunk<
  TPaginatedData<TUnit>,
  PaginationParams
>(GET_UNITS, async (paginationParams) => {
  const res = await api.units.getAll(paginationParams);
  return res;
});

export const addUnitAsync = createAsyncThunk<void, TCreateUnitData>(
  ADD_UNIT,
  async (createUnitData, { dispatch, getState }) => {
    const res = await api.units.createUnit(createUnitData);
    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "ЕИ успешно добавлена!");
    } else {
      return Promise.reject(res.message);
    }
  }
);

export const updateUnitAsync = createAsyncThunk<void, TUpdateUnitData>(
  UPDATE_UNIT,
  async (updateUnitData, { dispatch, getState }) => {
    const res = await api.units.updateUnit(updateUnitData);
    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "ЕИ успешно обновлена!");
    } else {
      return Promise.reject(res.message);
    }
  }
);

export const deleteUnitAsync = createAsyncThunk<void, number>(
  DELETE_UNIT,
  async (id, { dispatch, getState }) => {
    dispatch(setRemovingIds(id));
    const res = await api.units.deleteUnit(id);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refresh(dispatch, state);
      dispatchSuccessToast(dispatch, "ЕИ успешно удалена!");
    } else {
      dispatchErrorToast(dispatch, res.message);
    }

    dispatch(setRemovingIds(id));
  }
);
