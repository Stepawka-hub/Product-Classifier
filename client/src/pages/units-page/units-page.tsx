import { Loader } from "@components/common/loader";
import { AddUnitForm } from "@components/forms";
import { useTablePage } from "@hooks/useTablePage";
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getUnitsSelector,
  setCurrentPage,
} from "@slices/units";
import { deleteUnitAsync, getAllUnitsAsync } from "@thunks/units";
import { UnitsPageUI } from "@ui/pages";
import { unitsHeaders } from "@utils/constants";
import { TUnit } from "@utils/types";
import { useMemo } from "react";

export const UnitsPage = () => {
  const { isLoading, tableConfig, modalConfig, pagination } =
    useTablePage<TUnit>({
      headers: unitsHeaders,
      dataSelector: getUnitsSelector,
      getIsLoadingSelector,
      getPaginationSelector,
      setCurrentPage,
      getElementsAsync: getAllUnitsAsync,
      deleteElementAsync: deleteUnitAsync,
    });
  const { showModal, hideModal } = modalConfig;

  const modalContent = useMemo(
    () => <AddUnitForm onClose={hideModal} />,
    [hideModal]
  );

  if (isLoading) return <Loader />;

  return (
    <UnitsPageUI
      tableConfig={tableConfig}
      openModal={() => showModal(modalContent)}
      pagination={pagination}
    />
  );
};
