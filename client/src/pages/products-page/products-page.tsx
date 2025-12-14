import { useNavigate } from "react-router-dom";

import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import { useSelector } from "@store";
import {
  getIsAddingSelector,
  getIsLoadingSelector,
  getIsRemovingSelector,
  getIsUpdatingSelector,
  getPaginationSelector,
  getProductsSelector,
  getSelectedItemIdSelector as getSelectedItemId,
  setCurrentPage,
  setSelectedItemId,
} from "@slices/products";
import { deleteProductAsync, getAllProductsAsync } from "@thunks/products";
import { productsHeaders as headers } from "@utils/constants";
import { TProduct } from "@utils/types";

import {
  AddProductForm as AddForm,
  EditProductForm as EditForm,
  ChangeProductVersionForm,
  CreateProductModificationForm,
} from "@components/forms";
import { Loader } from "@components/common/loader";
import { BaseTableActions } from "@components/base-table-actions";
import { Button } from "@components/common/buttons";
import { TablePage } from "@ui/pages";

export const ProductsPage = () => {
  const navigate = useNavigate();
  const isAdding = useSelector(getIsAddingSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);
  const isRemoving = useSelector(getIsRemovingSelector);

  const { data, isLoading, pagination } = useTableData<TProduct>({
    dataSelector: getProductsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllProductsAsync,
    setCurrentPage,
  });

  const { showAddForm, showEditForm, showModal, hideModal } = useTableForms({
    AddForm,
    EditForm,
  });

  const { selectedItemId, handleSelect, handleDelete } = useTableActions({
    getSelectedItemId,
    setSelectedItemId,
    deleteElementAsync: deleteProductAsync,
    openEditForm: showEditForm,
  });

  if (isLoading) return <Loader />;

  const handleNavigateToSummary = () => {
    navigate(`${selectedItemId}/total-consumption`);
  };

  const isSelected = selectedItemId !== null;

  return (
    <TablePage<TProduct>
      title="Изделия"
      tableConfig={{ headers, data }}
      pagination={pagination}
      selectedItemId={selectedItemId}
      setSelectedItem={handleSelect}
      headerActions={
        <BaseTableActions
          isAdding={isAdding}
          isUpdating={isUpdating}
          isRemoving={isRemoving}
          isSelected={isSelected}
          onAddButtonClick={showAddForm}
          onEditButtonClick={showEditForm}
          onDeleteButtonClick={handleDelete}
        />
      }
      footerActions={
        <>
          <Button
            variant="view"
            disabled={!selectedItemId}
            onClick={handleNavigateToSummary}
          >
            Расчитать сводные нормы расхода
          </Button>
          <Button
            variant="plus"
            disabled={!selectedItemId}
            onClick={() =>
              showModal(<ChangeProductVersionForm onClose={hideModal} />)
            }
          >
            Создать изменение изделия
          </Button>
          <Button
            variant="plus"
            disabled={!selectedItemId}
            onClick={() =>
              showModal(<CreateProductModificationForm onClose={hideModal} />)
            }
          >
            Создать модификацию изделия
          </Button>
        </>
      }
    />
  );
};
