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
  getRemovingIdsSelector,
  getUnitsSelector,
  setCurrentPage,
  setEditingItemId,
} from "@slices/units";
import { deleteUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { unitsHeaders as headers } from "@utils/constants";
import { TUnit } from "@utils/types";
import { TablePage } from "@ui/pages";

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
    setEditingItemId,
    getRemovingIdsSelector,
    deleteElementAsync: deleteUnitAsync,
    openEditForm: showEditForm,
  });

  if (isLoading) return <Loader />;

  return (
    <TablePage<TUnit>
      title="Единицы измерения"
      tableConfig={{ headers, data, actions: {} }}
      pagination={pagination}
    />
  );
};
