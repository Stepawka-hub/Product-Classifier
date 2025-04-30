import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { setTotalCount as setTotalCategoriesCount } from "@slices/categories";
import { setTotalCount as setTotalProductsCount } from "@slices/products";
import { setTotalCount as setTotalUnitsCount } from "@slices/units";
import { AppThunkDispatch, TFetchEntitiesThunk } from "@thunks/types/types";
import { TargetId, TPagination } from "@utils/types";

type TEntityTotal = {
  products: number;
  categories: number;
  units: number;
};

export const setPaginationTotals = (
  dispatch: AppThunkDispatch,
  { products, categories, units }: TEntityTotal
) => {
  dispatch(setTotalProductsCount(products));
  dispatch(setTotalCategoriesCount(categories));
  dispatch(setTotalUnitsCount(units));
};

export const refreshTable = <T>(
  dispatch: AppThunkDispatch,
  getAllEntities: TFetchEntitiesThunk<T>,
  pagination: Pick<TPagination, "currentPage" | "pageSize">,
  setEditingItemId?: ActionCreatorWithPayload<TargetId, string>,
  setSelectedItemId?: ActionCreatorWithPayload<TargetId, string>
) => {
  const { currentPage, pageSize } = pagination;
  dispatch(
    getAllEntities({
      page: currentPage,
      limit: pageSize,
    })
  );

  if (setEditingItemId) {
    dispatch(setEditingItemId(null));
  }

  if (setSelectedItemId) {
    dispatch(setSelectedItemId(null));
  }
};
