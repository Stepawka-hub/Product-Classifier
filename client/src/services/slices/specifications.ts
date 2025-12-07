import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllSpecificationsAsync } from "@thunks/specifications";
import { TPaginatedData, TSpecification } from "@utils/types";
import { TInitialSpecificationState } from "./types/types";

const initialState: TInitialSpecificationState = {
  specifications: [],
  isLoading: false,

  pagination: {
    totalCount: 1,
    pageSize: 10,
    currentPage: 1,
  },
};

const specificationsSlice = createSlice({
  name: "specifications",
  initialState,
  reducers: {
    resetSpecificationsState: () => initialState,
    setSpecifications: (
      state,
      { payload }: PayloadAction<TSpecification[]>
    ) => {
      state.specifications = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
    setTotalCount: (state, { payload }: PayloadAction<number>) => {
      state.pagination.totalCount = payload;
    },
  },
  selectors: {
    getSpecificationsSelector: (state) => state.specifications,
    getIsLoadingSelector: (state) => state.isLoading,
    getPaginationSelector: (state) => state.pagination,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSpecificationsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllSpecificationsAsync.fulfilled,
        (state, { payload }: PayloadAction<TPaginatedData<TSpecification>>) => {
          state.isLoading = false;
          state.specifications = payload.items;
          state.pagination.totalCount = payload.total;
        }
      )
      .addCase(getAllSpecificationsAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const reducer = specificationsSlice.reducer;
export const {
  getSpecificationsSelector,
  getIsLoadingSelector,
  getPaginationSelector,
} = specificationsSlice.selectors;
export const {
  resetSpecificationsState,
  setSpecifications,
  setCurrentPage,
  setTotalCount,
} = specificationsSlice.actions;
