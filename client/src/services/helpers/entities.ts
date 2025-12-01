import { resetClassifiersState, setClassifiers } from "@slices/classifiers";
import { resetProductsState, setProducts } from "@slices/products";
import { resetUnitsState, setUnits } from "@slices/units";
import { AppThunkDispatch } from "@thunks/types/types";
import { TClassifier, TProduct, TUnit } from "@utils/types";

type TEntityItems = {
  products: TProduct[];
  classifiers: TClassifier[];
  units: TUnit[];
};

export const setAllEntitiesState = (
  dispatch: AppThunkDispatch,
  { products, classifiers, units }: TEntityItems
) => {
  dispatch(setProducts(products));
  dispatch(setClassifiers(classifiers));
  dispatch(setUnits(units));
};

export const resetAllState = (dispatch: AppThunkDispatch) => {
  dispatch(resetUnitsState());
  dispatch(resetClassifiersState());
  dispatch(resetProductsState());
};
