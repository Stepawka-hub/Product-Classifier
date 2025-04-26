import { Selector } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TDeleteEntityThunk } from "@thunks/types/types";
import { useCallback, useMemo } from "react";

type TUseTableActionsParams = {
  getIsRemovingSelector: Selector<RootState, (string | number)[]>;
  deleteElementAsync: TDeleteEntityThunk;
};

export const useTableActions = ({
  getIsRemovingSelector,
  deleteElementAsync,
}: TUseTableActionsParams) => {
  const dispatch = useDispatch();
  const isRemoving = useSelector(getIsRemovingSelector);

  const handleDelete = useCallback(
    async (id: number) => {
      dispatch(deleteElementAsync(id));
    },
    [dispatch, deleteElementAsync]
  );

  const handleEdit = useCallback(() => {}, []);

  return useMemo(
    () => ({
      isRemoving,
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
    [isRemoving, handleEdit, handleDelete]
  );
};
