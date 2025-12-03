import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInitializeSuccess } from "@slices/app";
import { resetAllState } from "../helpers/entities";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { getErrorMessage } from "@utils/helpers/error";
import { getAllClassifiersAsync } from "./classifiers";
import { getAllProductsAsync } from "./products";
import { getAllUnitsAsync } from "./units";

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
      const { resultCode } = await api.app.fillData();

      if (resultCode === SUCCESS_CODE) {
        const basePagination = {
          page: 1,
          limit: 10,
        };

        resetAllState(dispatch);

        await Promise.all([
          dispatch(getAllClassifiersAsync(basePagination)),
          dispatch(getAllProductsAsync(basePagination)),
          dispatch(getAllUnitsAsync(basePagination)),
        ]);

        dispatchSuccessToast(dispatch, "Данные успешно заполнены!");
      } else {
        dispatchErrorToast(dispatch, "Не удалось заполнить данные!");
      }
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
