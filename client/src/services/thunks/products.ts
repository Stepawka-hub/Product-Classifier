import { api } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TCreateProductData, TPaginatedData, TProduct } from "@utils/types";
import { dispatchSuccessToast } from "../helpers/toast";

const GET_PRODUCTS = "products/get";
const ADD_PRODUCT = "products/add";

export const getAllProductsAsync = createAsyncThunk<
  TPaginatedData<TProduct>,
  PaginationParams
>(GET_PRODUCTS, async (paginationParams) => {
  const res = await api.products.getAll(paginationParams);
  return res;
});

export const addProductAsync = createAsyncThunk<TProduct, TCreateProductData>(
  ADD_PRODUCT,
  async (createProductData, { dispatch }) => {
    const res = await api.products.create(createProductData);

    dispatchSuccessToast(dispatch, "Продукт успешно добавлен!");

    return res;
  }
);
