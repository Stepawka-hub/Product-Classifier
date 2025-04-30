import { resetCategoriesState, setCategories } from "@slices/categories";
import { resetProductsState, setProducts } from "@slices/products";
import { resetUnitsState, setUnits } from "@slices/units";
import { AppThunkDispatch } from "@thunks/types/types";
import { TCategory, TProduct, TUnit } from "@utils/types";

type TEntityItems = {
  products: TProduct[];
  categories: TCategory[];
  units: TUnit[];
};

export const setAllEntitiesState = (
  dispatch: AppThunkDispatch,
  { products, categories, units }: TEntityItems
) => {
  dispatch(setProducts(products));
  dispatch(setCategories(categories));
  dispatch(setUnits(units));
};

export const resetAllState = (dispatch: AppThunkDispatch) => {
  dispatch(resetUnitsState());
  dispatch(resetCategoriesState());
  dispatch(resetProductsState());
};
