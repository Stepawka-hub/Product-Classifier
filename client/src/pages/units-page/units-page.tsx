import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
import { usePagination } from '@hooks/usePagination';
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getUnitsSelector,
  setCurrentPage,
} from "@slices/units";
import { useDispatch, useSelector } from "@store";
import { getAllUnitsAsync } from "@thunks/units";
import { UnitsPageUI } from "@ui-pages";
import { useEffect } from "react";

export const UnitsPage = () => {
  const dispatch = useDispatch();
  const { showModal, handleShowModal, handleCloseModal } = useModal();
  const { pagination, currentPage, pageSize, setPageNumber } = usePagination(
    getPaginationSelector,
    setCurrentPage
  );
  const units = useSelector(getUnitsSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    dispatch(
      getAllUnitsAsync({
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, pageSize]);

  if (isLoading) return <Loader />;

  return (
    <UnitsPageUI
      units={units}
      showModal={showModal}
      pagination={{ ...pagination, setCurrentPage: setPageNumber }}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
