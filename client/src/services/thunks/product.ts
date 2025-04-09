import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@api";

const GET_ALL_PRODUCTS = "products/getAll";

export const getAllProducts = createAsyncThunk(
  GET_ALL_PRODUCTS,
  async () => {
    const res = await api.getProducts();
    console.log(res);
  }
);
