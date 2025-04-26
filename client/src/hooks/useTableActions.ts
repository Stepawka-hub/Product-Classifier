import { useDispatch } from '@store';
import { TDeleteEntityThunk } from '@thunks/types/types';
import { useCallback, useMemo } from 'react';

export const useTableActions = (deleteElementAsync: TDeleteEntityThunk) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteElementAsync(id));
  }, [dispatch, deleteElementAsync]);

  const handleEdit = useCallback(() => {
  }, []);

  return useMemo(() => ({
    onEdit: handleEdit,
    onDelete: handleDelete
  }), [handleEdit, handleDelete]);
};
