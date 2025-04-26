import { Loader } from "@components/common/loader";
import { AddProductForm } from "@components/forms";
import { useTablePage } from "@hooks/useTablePage";
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getProductsSelector,
  setCurrentPage,
} from "@slices/products";
import { deleteProductAsync, getAllProductsAsync } from "@thunks/products";
import { ProductsPageUI } from "@ui/pages";
import { productsHeaders } from "@utils/constants";
import { TProduct } from "@utils/types";
import { useMemo } from "react";

export const ProductsPage = () => {
  const { isLoading, tableConfig, modalConfig, pagination } =
    useTablePage<TProduct>({
      headers: productsHeaders,
      dataSelector: getProductsSelector,
      getIsLoadingSelector,
      getPaginationSelector,
      setCurrentPage,
      getElementsAsync: getAllProductsAsync,
      deleteElementAsync: deleteProductAsync,
    });
  const { showModal, hideModal } = modalConfig;

  const modalContent = useMemo(
    () => <AddProductForm onClose={hideModal} />,
    [hideModal]
  );

  if (isLoading) return <Loader />;

  return (
    <ProductsPageUI
      tableConfig={tableConfig}
      openModal={() => showModal(modalContent)}
      pagination={pagination}
    />
  );
};
