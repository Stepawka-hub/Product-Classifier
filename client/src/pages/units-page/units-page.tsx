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
  getRemovingIdsSelector,
  getPaginationSelector,
  getUnitsSelector,
  setCurrentPage,
  setEditingItem,
} from "@slices/units";
import { deleteUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { unitsHeaders as headers } from "@utils/constants";
import { TUnit } from "@utils/types";
import { TablePage } from "../table-page";

export const UnitsPage = () => {
  const { data, isLoading, pagination } = useTableData<TUnit>({
    dataSelector: getUnitsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllUnitsAsync,
    setCurrentPage,
  });
  const { showAddForm, showEditForm } = useTableForms({ AddForm, EditForm });
  const actions = useTableActions({
    getRemovingIdsSelector,
    setEditingItem,
    deleteElementAsync: deleteUnitAsync,
    openEditForm: showEditForm,
  });

  if (isLoading) return <Loader />;

  return (
    <TablePage<TUnit>
      title="Единицы измерения"
      addButtonLabel="Добавить ЕИ"
      tableConfig={{ headers, data, actions }}
      openAddForm={showAddForm}
      pagination={pagination}
    />
  );
};
