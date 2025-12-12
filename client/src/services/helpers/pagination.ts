import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { setTotalCount as setTotalClassifiersCount } from "@slices/classifiers";
import { setTotalCount as setTotalProductsCount } from "@slices/products";
import { setTotalCount as setTotalUnitsCount } from "@slices/units";
import { AppThunkDispatch, TFetchEntitiesThunk } from "@thunks/types/types";
import { TargetId, TPagination } from "@utils/types";

type TEntityTotal = {
  products: number;
  classifiers: number;
  units: number;
};

export const setPaginationTotals = (
  dispatch: AppThunkDispatch,
  { products, classifiers, units }: TEntityTotal
) => {
  dispatch(setTotalProductsCount(products));
  dispatch(setTotalClassifiersCount(classifiers));
  dispatch(setTotalUnitsCount(units));
};

export const refreshTable = <T>(
  dispatch: AppThunkDispatch,
  getAllEntities: TFetchEntitiesThunk<T>,
  pagination: Pick<TPagination, "currentPage" | "pageSize">,
  setSelectedItemId?: ActionCreatorWithPayload<TargetId, string>
) => {
  const { currentPage, pageSize } = pagination;
  dispatch(
    getAllEntities({
      page: currentPage,
      limit: pageSize,
    })
  );

  if (setSelectedItemId) {
    dispatch(setSelectedItemId(null));
  }
};
