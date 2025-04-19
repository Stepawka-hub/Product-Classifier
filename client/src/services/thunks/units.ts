import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToast } from "@slices/toasts";
import { api } from "@api";
import { TCreateUnitData, TUnit } from "@utils/types";
import { PaginationParams } from "@utils/api/types/types";

const GET_UNITS = "units/get";
const ADD_UNIT = "units/add";

export const getAllUnitsAsync = createAsyncThunk<TUnit[], PaginationParams>(
  GET_UNITS,
  async (paginationParams) => {
    const res = await api.units.getAll(paginationParams);
    return res;
  }
);

export const addUnitAsync = createAsyncThunk<TUnit, TCreateUnitData>(
  ADD_UNIT,
  async (createUnitData, { dispatch }) => {
    const res = await api.units.create(createUnitData);
    dispatch(
      addToast({
        message: "ЕИ успешно добавлена!",
        type: "success",
        duration: 2000,
      })
    );
    return res;
  }
);
