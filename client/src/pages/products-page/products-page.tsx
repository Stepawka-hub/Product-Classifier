import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
import { getIsLoadingSelector, getProductsSelector } from "@slices/products";
import { useDispatch, useSelector } from "@store";
import { getAllProductsAsync } from '@thunks/products';
import { ProductsPageUI } from "@ui/pages";
import { useEffect } from 'react';

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProductsSelector);
  const isLoading = useSelector(getIsLoadingSelector);
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <ProductsPageUI
      products={products}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
