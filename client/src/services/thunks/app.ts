import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInitializeSuccess } from "@slices/app";
import { resetAllState, setAllEntitiesState } from "../helpers/entities";
import { setPaginationTotals } from "../helpers/pagination";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { getErrorMessage } from "@utils/helpers/error";

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
    try {
      const { products, categories, units } = await api.app.fillData();

      resetAllState(dispatch);
      setAllEntitiesState(dispatch, {
        products: products.items,
        categories: categories.items,
        units: units.items,
      });
      setPaginationTotals(dispatch, {
        products: products.total,
        categories: categories.total,
        units: units.total,
      });

      dispatchSuccessToast(dispatch, "Данные успешно заполнены!");
    } catch (e) {
      dispatchErrorToast(
        dispatch,
        `Произошла ошибка при заполнении данных: ${getErrorMessage(e)}`
      );
    }
  }
);

export const clearDataAsync = createAsyncThunk(
  CLEAR_DATA,
  async (_, { dispatch }) => {
    try {
      const { resultCode } = await api.app.clearData();

      if (resultCode === SUCCESS_CODE) {
        resetAllState(dispatch);
        dispatchSuccessToast(dispatch, "Данные успешно очищены!");
      } else {
        dispatchErrorToast(dispatch, "Не удалось очистить данные!");
      }
    } catch (e) {
      dispatchErrorToast(
        dispatch,
        `Произошла ошибка при очистке данных: ${getErrorMessage(e)}`
      );
    }
  }
);
