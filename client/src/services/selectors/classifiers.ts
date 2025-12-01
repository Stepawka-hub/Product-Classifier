import { createSelector } from "@reduxjs/toolkit";
import {
  getEditingItemIdSelector,
  getClassifiersSelector,
  getSelectedItemIdSelector,
} from "@slices/classifiers";

export const getEditingClassifierSelector = createSelector(
  [getClassifiersSelector, getEditingItemIdSelector],
  (classifiers, editingItemId) => classifiers.find((c) => c.id === editingItemId)
);

export const getSelectedClassifierSelector = createSelector(
  [getClassifiersSelector, getSelectedItemIdSelector],
  (classifiers, selectedItemId) =>
    classifiers.find((c) => c.id === selectedItemId)
);
