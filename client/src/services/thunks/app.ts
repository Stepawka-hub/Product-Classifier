import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInitializeSuccess } from "@slices/app";
import { getAllProductsAsync } from "./products";
import { api } from "@api";
import { getAllCategoriesAsync } from "./categories";
import { getAllUnitsAsync } from "./units";

const INITIALIZE_APP = "app/initialize";
const FILL_DATA = "app/fill-data";

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

export const fillDataAsync = createAsyncThunk(FILL_DATA, async () => {
  api.fillData();
});
