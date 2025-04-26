import { Loader } from "@components/common/loader";
import { AddProductForm } from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useModal } from "@hooks/useModal";
import {
  getIsLoadingSelector,
  getIsRemovingSelector,
  getPaginationSelector,
  getProductsSelector,
  setCurrentPage,
} from "@slices/products";
import { deleteProductAsync, getAllProductsAsync } from "@thunks/products";
import { productsHeaders as headers } from "@utils/constants";
import { TProduct } from "@utils/types";
import { useMemo } from "react";
import { TablePage } from '../table-page';

export const ProductsPage = () => {
  const { data, isLoading, pagination } = useTableData<TProduct>({
    dataSelector: getProductsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllProductsAsync,
    setCurrentPage,
  });
  const actions = useTableActions({
    deleteElementAsync: deleteProductAsync,
    getIsRemovingSelector,
  });
  const { showModal, hideModal } = useModal();

  const modalContent = useMemo(
    () => <AddProductForm onClose={hideModal} />,
    [hideModal]
  );

  if (isLoading) return <Loader />;

  return (
    <TablePage<TProduct>
      title="Изделия"
      addButtonLabel="Добавить изделие"
      tableConfig={{ headers, data, ...actions }}
      openModal={() => showModal(modalContent)}
      pagination={pagination}
    />
  );
};
