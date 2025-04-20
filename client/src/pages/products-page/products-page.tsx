import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
import { usePagination } from "@hooks/usePagination";
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getProductsSelector,
  setCurrentPage,
} from "@slices/products";
import { useDispatch, useSelector } from "@store";
import { getAllProductsAsync } from "@thunks/products";
import { ProductsPageUI } from "@ui/pages";
import { useEffect } from "react";

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const { showModal, handleShowModal, handleCloseModal } = useModal();
  const { pagination, currentPage, pageSize, setPageNumber } = usePagination(
    getPaginationSelector,
    setCurrentPage
  );
  const products = useSelector(getProductsSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    dispatch(
      getAllProductsAsync({
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, pageSize]);

  if (isLoading) return <Loader />;

  return (
    <ProductsPageUI
      products={products}
      showModal={showModal}
      pagination={{ ...pagination, setCurrentPage: setPageNumber }}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
