import { useModal } from '@hooks/useModal';
import { getProductsSelector } from "@slices/products";
import { useSelector } from "@store";
import { ProductsPageUI } from "@ui/pages";

export const ProductsPage = () => {
  const products = useSelector(getProductsSelector);
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  return (
    <ProductsPageUI
      products={products}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
