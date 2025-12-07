import { api } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TPaginatedData, TSpecification } from "@utils/types";

const GET_SPECIFICATIONS = "specifications/get";

export const getAllSpecificationsAsync = createAsyncThunk<
  TPaginatedData<TSpecification>,
  PaginationParams
>(GET_SPECIFICATIONS, async (paginationParams) => {
  const res = await api.specifications.getAll(paginationParams);
  return res;
});
