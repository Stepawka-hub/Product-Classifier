/* eslint-disable react-hooks/exhaustive-deps */
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState, useDispatch, useSelector } from "@store";
import { TFetchEntitiesThunk } from "@thunks/types/types";
import { TPagination } from "@utils/types";
import { useEffect } from "react";
import { Selector } from "react-redux";
import { usePagination } from "../usePagination";

type TUseTableDataParams<T> = {
  dataSelector: Selector<RootState, T[]>;
  getIsLoadingSelector: Selector<RootState, boolean>;
  getPaginationSelector: Selector<
    RootState,
    Omit<TPagination, "setCurrentPage">
  >;
  setCurrentPage: ActionCreatorWithPayload<number, string>;
  getElementsAsync: TFetchEntitiesThunk<T>;
};

export const useTableData = <T>({
  dataSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  setCurrentPage,
  getElementsAsync,
}: TUseTableDataParams<T>) => {
  const dispatch = useDispatch();
  const { pagination, currentPage, pageSize, setPageNumber } = usePagination(
    getPaginationSelector,
    setCurrentPage
  );
  const data = useSelector(dataSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    dispatch(getElementsAsync({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize, dispatch]);

  return {
    isLoading,
    data,
    pagination: { ...pagination, setCurrentPage: setPageNumber },
  };
};
