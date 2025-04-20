import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInitializeSuccess } from "@slices/app";
import {
  setAllEntitiesState,
  resetAllEntitiesState,
} from "../helpers/entities";
import {
  setPaginationTotals,
  resetAllPaginationState,
} from "../helpers/pagination";
import { dispatchSuccessToast } from "../helpers/toast";

const INITIALIZE_APP = "app/initialize";
const FILL_DATA = "app/fill-data";
const CLEAR_DATA = "app/clear-data";

export const initialize = createAsyncThunk(
  INITIALIZE_APP,
  async (_, { dispatch }) => {
    dispatch(setInitializeSuccess());
  }
);

export const fillDataAsync = createAsyncThunk(
  FILL_DATA,
  async (_, { dispatch }) => {
    const { products, categories, units } = await api.app.fillData();

    setAllEntitiesState(dispatch, {
      products: products.items,
      categories: categories.items,
      units: units.items,
    });

    resetAllPaginationState(dispatch);

    setPaginationTotals(dispatch, {
      products: products.total,
      categories: categories.total,
      units: units.total,
    });

    dispatchSuccessToast(dispatch, "Данные успешно заполнены!");
  }
);

export const clearDataAsync = createAsyncThunk(
  CLEAR_DATA,
  async (_, { dispatch }) => {
    const { resultCode } = await api.app.clearData();

    if (resultCode === SUCCESS_CODE) {
      resetAllEntitiesState(dispatch);
      resetAllPaginationState(dispatch);
      dispatchSuccessToast(dispatch, "Данные успешно очищены!");
    }
  }
);
