import { api, SUCCESS_CODE } from "@utils/api/base.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInitializeSuccess } from "@slices/app";
import { setCategories } from "@slices/categories";
import { setProducts } from "@slices/products";
import { addToast } from "@slices/toasts";
import { setUnits } from "@slices/units";

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
    const { products, categories, units } = await api.fillData();
    dispatch(setProducts(products));
    dispatch(setCategories(categories));
    dispatch(setUnits(units));
    dispatch(
      addToast({
        message: "Данные успешно заполнены!",
        type: "success",
        duration: 2500,
      })
    );
  }
);

export const clearDataAsync = createAsyncThunk(
  CLEAR_DATA,
  async (_, { dispatch }) => {
    const { resultCode } = await api.clearData();

    if (resultCode === SUCCESS_CODE) {
      dispatch(setProducts([]));
      dispatch(setCategories([]));
      dispatch(setUnits([]));
      dispatch(
        addToast({
          message: "Данные успешно очищены!",
          type: "success",
          duration: 2500,
        })
      );
    }
  }
);
