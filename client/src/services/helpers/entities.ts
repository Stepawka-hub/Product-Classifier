import { resetClassifiersState } from "@slices/classifiers";
import { resetProductsState } from "@slices/products";
import { resetSpecificationsState } from "@slices/specifications";
import { resetUnitsState } from "@slices/units";
import { AppThunkDispatch } from "@thunks/types/types";

export const resetAllState = (dispatch: AppThunkDispatch) => {
  dispatch(resetUnitsState());
  dispatch(resetClassifiersState());
  dispatch(resetProductsState());
  dispatch(resetSpecificationsState());
};
