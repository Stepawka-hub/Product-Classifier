import { createAsyncThunk } from "@reduxjs/toolkit";
import { TCreateProductData, TProduct } from "@utils/types";
import { addToast } from "@slices/toasts";
import { api } from '@api';
import { PaginationParams } from '@utils/api/types/types';

const GET_PRODUCTS = "products/get";
const ADD_PRODUCT = "products/add";

export const getAllProductsAsync = createAsyncThunk<
  TProduct[],
  PaginationParams
>(
  GET_PRODUCTS,
  async (paginationParams) => {
    const res = await api.products.getAll(paginationParams);
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
