import { FC } from "react";

import { useSelector } from "@store";
import {
  getChildrenSelector,
  getIsFetchChildrenSelector,
  getIsFetchLeavesSelector,
  getIsFetchParentsSelector,
  getLeavesSelector,
  getNodesPaginationSelector,
  getParentsSelector,
  setNodeCurrentPage,
} from "@slices/classifiers";
import {
  getClassifierLeavesAsync,
  getChildClassifiersAsync,
  getParentClassifiersAsync,
} from "@thunks/classifiers";
import { getSelectedClassifierSelector } from "@selectors/classifiers";

import { useTableData } from "@hooks/table/useTableData";
import { PaginationParams } from "@utils/api/types";
import { productsHeaders, shortClassifiersHeaders } from "@utils/constants";
import { TClassifierShort, TEntity, TProduct } from "@utils/types";

import { Loader } from "@components/common/loader";
import { TClassifierRelationsProps } from "./type";
import s from "./classifier-relations.module.css";
import { Table } from "@ui/table";

type RelationDataType<T extends "parents" | "children" | "leaves"> =
  T extends "leaves" ? TProduct : TClassifierShort;

export const ClassifierRelations: FC<TClassifierRelationsProps> = ({
  type,
}) => {
  const selectedItem = useSelector(getSelectedClassifierSelector);

  const config = {
    parents: {
      headers: shortClassifiersHeaders,
      title: `Родительские классификаторы - "${selectedItem?.name}"`,
      dataSelector: getParentsSelector,
      getIsLoadingSelector: getIsFetchParentsSelector,
      getElementsAsync: getParentClassifiersAsync,
    },
    children: {
      headers: shortClassifiersHeaders,
      title: `Дочерние классификаторы - "${selectedItem?.name}"`,
      dataSelector: getChildrenSelector,
      getIsLoadingSelector: getIsFetchChildrenSelector,
      getElementsAsync: getChildClassifiersAsync,
    },
    leaves: {
      headers: productsHeaders,
      title: `Изделия (Листья) - "${selectedItem?.name}"`,
      dataSelector: getLeavesSelector,
      getIsLoadingSelector: getIsFetchLeavesSelector,
      getElementsAsync: getClassifierLeavesAsync,
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
          selectable={false}
        />
      ) : (
        <div className={s.notFound}>Узлы не найдены!</div>
      )}
    </div>
  );
};
