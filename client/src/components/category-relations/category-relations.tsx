import { Loader } from "@components/common/loader";
import { Table } from "@components/table";
import { useTableData } from "@hooks/table/useTableData";
import {
  getChildrenSelector,
  getIsFetchChildrenSelector,
  getIsFetchLeavesSelector,
  getIsFetchParentsSelector,
  getLeavesSelector,
  getNodesPaginationSelector,
  getParentsSelector,
  setNodeCurrentPage,
} from "@slices/categories";
import { useSelector } from "@store";
import {
  getCategoryLeavesAsync,
  getChildCategoriesAsync,
  getParentCategoriesAsync,
} from "@thunks/categories";
import { PaginationParams } from "@utils/api/types/types";
import { productsHeaders, shortCategoriesHeaders } from "@utils/constants";
import { TCategoryShort, TEntity, TProduct } from "@utils/types";
import { FC } from "react";
import s from "./category-relations.module.css";
import { TCategoryRelationsProps } from "./type";
import { getSelectedCategorySelector } from "@selectors/categories";

type RelationDataType<T extends "parents" | "children" | "leaves"> =
  T extends "leaves" ? TProduct : TCategoryShort;

export const CategoryRelations: FC<TCategoryRelationsProps> = ({ type }) => {
  const selectedItem = useSelector(getSelectedCategorySelector);

  const config = {
    parents: {
      headers: shortCategoriesHeaders,
      title: `Родительские категории - "${selectedItem?.name}"`,
      dataSelector: getParentsSelector,
      getIsLoadingSelector: getIsFetchParentsSelector,
      getElementsAsync: getParentCategoriesAsync,
    },
    children: {
      headers: shortCategoriesHeaders,
      title: `Дочерние категории - "${selectedItem?.name}"`,
      dataSelector: getChildrenSelector,
      getIsLoadingSelector: getIsFetchChildrenSelector,
      getElementsAsync: getChildCategoriesAsync,
    },
    leaves: {
      headers: productsHeaders,
      title: `Изделия (Листья) - "${selectedItem?.name}"`,
      dataSelector: getLeavesSelector,
      getIsLoadingSelector: getIsFetchLeavesSelector,
      getElementsAsync: getCategoryLeavesAsync,
    },
  };

  const currentConfig = config[type];

  const { data, isLoading, pagination } = useTableData<
    RelationDataType<typeof type>,
    PaginationParams & TEntity
  >({
    dataSelector: currentConfig.dataSelector,
    getIsLoadingSelector: currentConfig.getIsLoadingSelector,
    getPaginationSelector: getNodesPaginationSelector,
    getElementsAsync: currentConfig.getElementsAsync,
    setCurrentPage: setNodeCurrentPage,
    additionalParams: { id: selectedItem?.id },
  });
  const isEmpty = data.length;

  if (isLoading) return <Loader />;

  return (
    <div className={s.container}>
      <h2 className={s.title}>{currentConfig.title}</h2>
      {isEmpty ? (
        <Table<RelationDataType<typeof type>>
          headers={currentConfig.headers}
          data={data}
          pagination={pagination}
        />
      ) : (
        <div className={s.notFound}>Узлы не найдены!</div>
      )}
    </div>
  );
};
