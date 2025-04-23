import { Loader } from "@components/common/loader";
import { AddProductForm } from "@components/forms";
import { useTablePage } from "@hooks/useTablePage";
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getProductsSelector,
  setCurrentPage,
} from "@slices/products";
import { getAllProductsAsync } from "@thunks/products";
import { ProductsPageUI } from "@ui/pages";
import { productsHeaders } from "@utils/constants";
import { TProduct } from "@utils/types";

export const ProductsPage = () => {
  const { isLoading, tableConfig, modalConfig, pagination } =
    useTablePage<TProduct>(
      productsHeaders,
      getProductsSelector,
      getIsLoadingSelector,
      getPaginationSelector,
      setCurrentPage,
      getAllProductsAsync
    );

  if (isLoading) return <Loader />;

  return (
    <ProductsPageUI
      tableConfig={tableConfig}
      modalConfig={{
        renderModal: <AddProductForm onClose={modalConfig.onClose} />,
        ...modalConfig,
      }}
      pagination={pagination}
    />
  );
};
