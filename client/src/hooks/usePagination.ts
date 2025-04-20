import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TPagination } from '@utils/types';
import { Selector } from "react-redux";

export const usePagination = (
  getPaginationSelector: Selector<
    RootState,
    Omit<TPagination, "setCurrentPage">
  >,
  setCurrentPage: ActionCreatorWithPayload<number, string>
) => {
  const dispatch = useDispatch();
  const pagination = useSelector(getPaginationSelector);
  const { currentPage, pageSize } = pagination;

  const setPageNumber = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return { pagination, currentPage, pageSize, setPageNumber };
};
