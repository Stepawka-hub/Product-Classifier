import {
  setCurrentPage as setCurrentCategoryPage,
  setTotalCount as setTotalCategoriesCount,
} from "@slices/categories";
import {
  setCurrentPage as setCurrentProductPage,
  setTotalCount as setTotalProductsCount,
} from "@slices/products";
import {
  setCurrentPage as setCurrentUnitPage,
  setTotalCount as setTotalUnitsCount,
} from "@slices/units";
import { AppThunkDispatch, TFetchEntitiesThunk } from "@thunks/types/types";
import { TPagination } from "@utils/types";

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

export const resetAllPaginationState = (dispatch: AppThunkDispatch) => {
  [setCurrentCategoryPage, setCurrentProductPage, setCurrentUnitPage].forEach(
    (action) => dispatch(action(1))
  );
  setPaginationTotals(dispatch, {
    products: 1,
    categories: 1,
    units: 1,
  });
};

export const refreshTable = <T>(
  dispatch: AppThunkDispatch,
  getAllEntities: TFetchEntitiesThunk<T>,
  pagination: Pick<TPagination, "currentPage" | "pageSize">
) => {
  const { currentPage, pageSize } = pagination;
  dispatch(
    getAllEntities({
      page: currentPage,
      limit: pageSize,
    })
  );
};
