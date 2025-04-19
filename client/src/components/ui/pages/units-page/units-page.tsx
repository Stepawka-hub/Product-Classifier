import { AddUnitForm } from "@components/forms";
import { TablePage } from "@pages";
import { unitHeaders } from "@utils/constants";
import { TUnit } from "@utils/types";
import { FC } from "react";
import { UnitsPageUIProps } from "./type";

export const UnitsPageUI: FC<UnitsPageUIProps> = ({
  units,
  showModal,
  pagination,
  handleShowModal,
  handleCloseModal,
}) => (
  <TablePage<TUnit>
    title="Единицы измерения"
    headers={unitHeaders}
    data={units}
    addButtonLabel="Добавить ЕИ"
    pagination={pagination}
    renderModal={<AddUnitForm onClose={handleCloseModal} />}
    isModalOpen={showModal}
    onOpenModal={handleShowModal}
    onCloseModal={handleCloseModal}
  />
);
