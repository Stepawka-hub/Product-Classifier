import { ActionCreatorWithPayload, Selector } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TDeleteEntityThunk } from "@thunks/types/types";
import { useCallback, useMemo } from "react";

type TUseTableActionsParams<T> = {
  getIsRemovingSelector: Selector<RootState, (string | number)[]>;
  setEditingItem: ActionCreatorWithPayload<T | null, string>;
  deleteElementAsync: TDeleteEntityThunk;
  openEditForm: () => void;
};

export const useTableActions = <T>({
  getIsRemovingSelector,
  setEditingItem,
  deleteElementAsync,
  openEditForm,
}: TUseTableActionsParams<T>) => {
  const dispatch = useDispatch();
  const isRemoving = useSelector(getIsRemovingSelector);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteElementAsync(id));
    },
    [dispatch, deleteElementAsync]
  );

  const handleEdit = useCallback(
    (element: T) => {
      dispatch(setEditingItem(element));
      openEditForm();
    },
    [dispatch, setEditingItem, openEditForm]
  );

  return useMemo(
    () => ({
      isRemoving,
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
    [isRemoving, handleEdit, handleDelete]
  );
};
