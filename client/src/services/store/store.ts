import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from "react-redux";

import { reducer as appReducer } from "@slices/app";
import { reducer as productsReducer } from "@slices/products";
import { reducer as categoriesReducer } from "@slices/categories";
import { reducer as unitsReducer } from "@slices/units";
import { reducer as toastsReducer } from "@slices/toasts";

const rootReducer = combineReducers({
  app: appReducer,
  products: productsReducer,
  categories: categoriesReducer,
  units: unitsReducer,
  toasts: toastsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
