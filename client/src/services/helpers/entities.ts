import { setCategories } from "@slices/categories";
import { setProducts } from "@slices/products";
import { setUnits } from "@slices/units";
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

export const resetAllEntitiesState = (dispatch: AppThunkDispatch) => {
  setAllEntitiesState(dispatch, {
    products: [],
    categories: [],
    units: [],
  });
};
