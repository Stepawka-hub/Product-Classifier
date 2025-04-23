import { AsyncThunk, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { PaginationParams } from "@utils/api/types/types";
import { TPaginatedData } from "@utils/types";

export type AppThunkDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;

export type TFetchEntitiesThunk<T> = AsyncThunk<
  TPaginatedData<T>,
  PaginationParams,
  object
>;

export type TDeleteEntityThunk = AsyncThunk<void, number, object>;
