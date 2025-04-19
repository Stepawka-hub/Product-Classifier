import { createAsyncThunk } from "@reduxjs/toolkit";
import { TCreateProductData, TProduct } from "@utils/types";
import { addToast } from "@slices/toasts";
import { api } from '@api';

const GET_ALL_PRODUCTS = "products/getAll";
const ADD_PRODUCT = "products/add";

export const getAllProductsAsync = createAsyncThunk(
  GET_ALL_PRODUCTS,
  async () => {
    const res = await api.products.getAll();
    return res;
  }
);

export const addProductAsync = createAsyncThunk<TProduct, TCreateProductData>(
  ADD_PRODUCT,
  async (createProductData, { dispatch }) => {
    const res = await api.products.create(createProductData);

    dispatch(
      addToast({
        message: "Продукт успешно добавлен!",
        type: "success",
        duration: 2000,
      })
    );
    return res;
  }
);
