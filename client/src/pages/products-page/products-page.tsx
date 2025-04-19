import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
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

  const products = useSelector(getProductsSelector);
  const pagination = useSelector(getPaginationSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    dispatch(
      getAllProductsAsync({
        page: pagination.currentPage,
        limit: pagination.pageSize,
      })
    );
  }, []);

  const setPageNumber = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
