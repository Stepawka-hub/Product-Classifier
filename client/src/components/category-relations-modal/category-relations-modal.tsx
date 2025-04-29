import { FC } from "react";
import { TCategoryRelationsModalProps } from "./type";
import { Table } from "@components/table";
import { TCategoryShort, TEntity } from "@utils/types";
import { useTableData } from "@hooks/table/useTableData";
import {
  getChildrenSelector,
  getIsFetchChildrenSelector,
  getIsFetchParentsSelector,
  getNodesPaginationSelector,
  getParentsSelector,
  setNodeCurrentPage,
} from "@slices/categories";
import {
  getChildCategoriesAsync,
  getParentCategoriesAsync,
} from "@thunks/categories";
import { PaginationParams } from "@utils/api/types/types";
import { shortCategoriesHeaders } from "@utils/constants";
import { Loader } from "@components/common/loader";

export const CategoryRelationsModal: FC<TCategoryRelationsModalProps> = ({
  type,
}) => {
  const config = {
    parents: {
      dataSelector: getParentsSelector,
      getIsLoadingSelector: getIsFetchParentsSelector,
      getElementsAsync: getParentCategoriesAsync,
    },
    children: {
      dataSelector: getChildrenSelector,
      getIsLoadingSelector: getIsFetchChildrenSelector,
      getElementsAsync: getChildCategoriesAsync,
    },
  };

  const { data, isLoading, pagination } = useTableData<
    TCategoryShort,
    PaginationParams & TEntity
  >({
    dataSelector: config[type].dataSelector,
    getIsLoadingSelector: config[type].getIsLoadingSelector,
    getPaginationSelector: getNodesPaginationSelector,
    getElementsAsync: config[type].getElementsAsync,
    setCurrentPage: setNodeCurrentPage,
    additionalParams: { id: 4 },
  });

  if (isLoading) return <Loader />;

  return (
    <Table<TCategoryShort>
      headers={shortCategoriesHeaders}
      data={data}
      pagination={pagination}
      removingIds={[]}
      onEdit={() => null}
      onDelete={() => null}
    />
  );
};
