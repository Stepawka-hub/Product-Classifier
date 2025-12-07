import { useTableData } from "@hooks/table/useTableData";
import { specificationsHeaders as headers } from "@utils/constants";
import { TSpecification } from "@utils/types";
import { Loader } from "@components/common/loader";
import { TablePage } from "@ui/pages";
import {
  getSpecificationsSelector,
  getIsLoadingSelector,
  getPaginationSelector,
  setCurrentPage,
} from "@slices/specifications";
import { getAllSpecificationsAsync } from "@thunks/specifications";

export const SpecificationsPage = () => {
  const { data, isLoading, pagination } = useTableData<TSpecification>({
    dataSelector: getSpecificationsSelector,
    getIsLoadingSelector,
    getPaginationSelector,
    getElementsAsync: getAllSpecificationsAsync,
    setCurrentPage,
  });
  
  if (isLoading) return <Loader />;

  return (
    <TablePage<TSpecification>
      title="Изделия"
      tableConfig={{ headers, data }}
      pagination={pagination}
      selectable={false}
    />
  );
};
