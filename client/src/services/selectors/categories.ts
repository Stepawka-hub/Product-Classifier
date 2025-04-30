import { createSelector } from "@reduxjs/toolkit";
import {
  getEditingItemIdSelector,
  getCategoriesSelector,
} from "@slices/categories";

export const getEditingCategorySelector = createSelector(
  [getCategoriesSelector, getEditingItemIdSelector],
  (categories, editingItemId) => categories.find((c) => c.id === editingItemId)
);
