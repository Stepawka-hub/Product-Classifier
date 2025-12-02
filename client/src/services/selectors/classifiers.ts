import { createSelector } from "@reduxjs/toolkit";
import {
  getClassifiersSelector,
  getSelectedItemIdSelector,
} from "@slices/classifiers";


export const getSelectedClassifierSelector = createSelector(
  [getClassifiersSelector, getSelectedItemIdSelector],
  (classifiers, selectedItemId) =>
    classifiers.find((c) => c.id === selectedItemId)
);
