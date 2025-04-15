import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@api";

const GET_ALL_PRODUCTS = "products/getAll";

export const getAllProductsAsync = createAsyncThunk(
  GET_ALL_PRODUCTS,
  async () => {
    const res = await api.getProducts();
    console.log(res);
    return res;
  }
);
