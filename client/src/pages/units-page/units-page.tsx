import { Loader } from "@components/common/loader";
import { AddUnitForm } from "@components/forms";
import { useTablePage } from "@hooks/useTablePage";
import {
  getIsLoadingSelector,
  getPaginationSelector,
  getUnitsSelector,
  setCurrentPage,
} from "@slices/units";
import { getAllUnitsAsync } from "@thunks/units";
import { UnitsPageUI } from "@ui/pages";
import { unitsHeaders } from "@utils/constants";
import { TUnit } from "@utils/types";

export const UnitsPage = () => {
  const { isLoading, tableConfig, modalConfig, pagination } =
    useTablePage<TUnit>(
      unitsHeaders,
      getUnitsSelector,
      getIsLoadingSelector,
      getPaginationSelector,
      setCurrentPage,
      getAllUnitsAsync
    );

  if (isLoading) return <Loader />;

  return (
    <UnitsPageUI
      tableConfig={tableConfig}
      modalConfig={{
        renderModal: <AddUnitForm onClose={modalConfig.onClose} />,
        ...modalConfig,
      }}
      pagination={pagination}
    />
  );
};
