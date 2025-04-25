import { api, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TCreateProductData, TPaginatedData, TProduct } from "@utils/types";
import { dispatchErrorToast, dispatchSuccessToast } from "../helpers/toast";
import { RootState } from "@store";
import { refreshTable } from "../helpers/pagination";

const GET_PRODUCTS = "products/get";
const ADD_PRODUCT = "products/add";
const DELETE_PRODUCT = "products/delete";

export const getAllProductsAsync = createAsyncThunk<
  TPaginatedData<TProduct>,
  PaginationParams
>(GET_PRODUCTS, async (paginationParams) => {
  const res = await api.products.getAll(paginationParams);
  return res;
});

export const addProductAsync = createAsyncThunk<void, TCreateProductData>(
  ADD_PRODUCT,
  async (createProductData, { dispatch, getState }) => {
    const res = await api.products.createProduct(createProductData);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refreshTable<TProduct>(
        dispatch,
        getAllProductsAsync,
        state.products.pagination
      );
      dispatchSuccessToast(dispatch, "Изделие успешно добавлено!");
    } else {
      return Promise.reject(res.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk<void, number>(
  DELETE_PRODUCT,
  async (id, { dispatch, getState }) => {
    const res = await api.products.deleteProduct(id);

    if (res.resultCode === SUCCESS_CODE) {
      const state = getState() as RootState;
      refreshTable<TProduct>(
        dispatch,
        getAllProductsAsync,
        state.products.pagination
      );
      dispatchSuccessToast(dispatch, "Изделие успешно удалено!");
    } else {
      dispatchErrorToast(dispatch, res.message);
    }
  }
);
