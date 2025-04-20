import { api } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TCreateUnitData, TPaginatedData, TUnit } from "@utils/types";
import { dispatchSuccessToast } from "../helpers/toast";

const GET_UNITS = "units/get";
const ADD_UNIT = "units/add";

export const getAllUnitsAsync = createAsyncThunk<
  TPaginatedData<TUnit>,
  PaginationParams
>(GET_UNITS, async (paginationParams) => {
  const res = await api.units.getAll(paginationParams);
  return res;
});

export const addUnitAsync = createAsyncThunk<TUnit, TCreateUnitData>(
  ADD_UNIT,
  async (createUnitData, { dispatch }) => {
    const res = await api.units.create(createUnitData);

    dispatchSuccessToast(dispatch, "ЕИ успешно добавлена!");

    return res;
  }
);
