import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInitializeSuccess } from "@slices/app";
import { getAllProductsAsync } from "./products";
import { api, SUCCESS_CODE } from "@api";
import { getAllCategoriesAsync } from "./categories";
import { getAllUnitsAsync } from "./units";
import { setUnits } from "@slices/units";
import { setCategories } from "@slices/categories";
import { setProducts } from "@slices/products";

const INITIALIZE_APP = "app/initialize";
const FILL_DATA = "app/fill-data";
const CLEAR_DATA = "app/clear-data";

export const initialize = createAsyncThunk(
  INITIALIZE_APP,
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(getAllProductsAsync()),
      dispatch(getAllCategoriesAsync()),
      dispatch(getAllUnitsAsync()),
    ]);
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
    }
  }
);
