import { AsyncThunk, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  PaginationParams,
  TCalculateTotalConsumptionParams,
} from "@utils/api/types/types";
import { TEntityId, TPaginatedData } from "@utils/types";

export type AppThunkDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;

export type TFetchEntitiesThunk<T> = AsyncThunk<
  TPaginatedData<T>,
  PaginationParams,
  object
>;

export type TDeleteEntityThunk = AsyncThunk<void, number, object>;

export type TCalculateTotalConsumptionPayload = {
  productId: TEntityId;
  params: TCalculateTotalConsumptionParams;
};
