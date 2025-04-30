import { Loader } from "@components/common/loader";
import { Table } from "@components/table";
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
import { TCategoryShort, TEntity } from "@utils/types";
import { FC } from "react";
import s from "./category-relations.module.css";
import { TCategoryRelationsProps } from "./type";

export const CategoryRelations: FC<TCategoryRelationsProps> = ({ type }) => {
  const config = {
    parents: {
      title: "Родительские категории",
      dataSelector: getParentsSelector,
      getIsLoadingSelector: getIsFetchParentsSelector,
      getElementsAsync: getParentCategoriesAsync,
    },
    children: {
      title: "Дочерние категории",
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
    <div className={s.container}>
      <h2 className={s.title}>{config[type].title}</h2>
      <Table<TCategoryShort>
        headers={shortCategoriesHeaders}
        data={data}
        pagination={pagination}
      />
    </div>
  );
};
