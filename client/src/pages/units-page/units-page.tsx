import { Loader } from "@components/common/loader";
import {
  AddUnitForm as AddForm,
  EditUnitForm as EditForm,
} from "@components/forms";
import { TTableActions } from "@components/types";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useTableForms } from "@hooks/table/useTableForms";
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getRemovingIdsSelector,
  getUnitsSelector,
  setCurrentPage,
  setEditingItemId,
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
  const actions: TTableActions<TUnit> = useTableActions({
    setEditingItemId,
    getRemovingIdsSelector,
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
