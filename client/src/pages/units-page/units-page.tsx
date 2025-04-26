import { Loader } from "@components/common/loader";
import { AddUnitForm } from "@components/forms";
import { useTableActions } from "@hooks/table/useTableActions";
import { useTableData } from "@hooks/table/useTableData";
import { useModal } from "@hooks/useModal";
import {
  getIsLoadingSelector,
  getIsRemovingSelector,
  getPaginationSelector,
  getUnitsSelector,
  setCurrentPage,
} from "@slices/units";
import { deleteUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { unitsHeaders as headers } from "@utils/constants";
import { TUnit } from "@utils/types";
import { useMemo } from "react";
import { TablePage } from "../table-page";

export const UnitsPage = () => {
  const { data, isLoading, pagination } = useTableData<TUnit>({
    dataSelector: getUnitsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllUnitsAsync,
    setCurrentPage,
  });
  const actions = useTableActions({
    deleteElementAsync: deleteUnitAsync,
    getIsRemovingSelector,
  });
  const { showModal, hideModal } = useModal();

  const modalContent = useMemo(
    () => <AddUnitForm onClose={hideModal} />,
    [hideModal]
  );

  if (isLoading) return <Loader />;

  return (
    <TablePage<TUnit>
      title="Единицы измерения"
      addButtonLabel="Добавить ЕИ"
      tableConfig={{ headers, data, ...actions }}
      openModal={() => showModal(modalContent)}
      pagination={pagination}
    />
  );
};
