import { createSelector } from "@reduxjs/toolkit";
import {
  getEditingItemIdSelector,
  getCategoriesSelector,
  getSelectedItemIdSelector,
} from "@slices/categories";

export const getEditingCategorySelector = createSelector(
  [getCategoriesSelector, getEditingItemIdSelector],
  (categories, editingItemId) => categories.find((c) => c.id === editingItemId)
);

export const getSelectedCategorySelector = createSelector(
  [getCategoriesSelector, getSelectedItemIdSelector],
  (categories, selectedItemId) =>
    categories.find((c) => c.id === selectedItemId)
);
