import { Loader } from "@components/common/loader";
import {
  AddUnitForm as AddForm,
  EditUnitForm as EditForm,
} from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getUnitsSelector,
  getSelectedItemIdSelector as getSelectedItemId,
  setCurrentPage,
  setSelectedItemId,
  getIsUpdatingSelector,
  getIsRemovingSelector,
  getIsAddingSelector,
} from "@slices/units";
import { deleteUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { unitsHeaders as headers } from "@utils/constants";
import { TUnit } from "@utils/types";
import { TablePage } from "@ui/pages";
import { useSelector } from "@store";
import { BaseTableActions } from "@components/base-table-actions";

export const UnitsPage = () => {
  const isAdding = useSelector(getIsAddingSelector);
  const isUpdating = useSelector(getIsUpdatingSelector);
  const isRemoving = useSelector(getIsRemovingSelector);

  const { data, isLoading, pagination } = useTableData<TUnit>({
    dataSelector: getUnitsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllUnitsAsync,
    setCurrentPage,
  });

  const { showAddForm, showEditForm } = useTableForms({ AddForm, EditForm });

  const { selectedItemId, handleSelect, handleDelete } = useTableActions({
    getSelectedItemId,
    setSelectedItemId,
    deleteElementAsync: deleteUnitAsync,
    openEditForm: showEditForm,
  });

  if (isLoading) return <Loader />;

  const isSelected = selectedItemId !== null;

  return (
    <TablePage<TUnit>
      title="Единицы измерения"
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
    />
  );
};
