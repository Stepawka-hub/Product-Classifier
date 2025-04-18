import { BasePage } from "@pages";
import { FC } from "react";
import { Button } from "@components/common/buttons";
import { UnitsPageUIProps } from "./type";
import { TUnit } from "@utils/types";
import { Table } from "@components/table";
import { Modal } from "@components/modal";
import { AddUnitForm } from "@components/forms";

export const UnitsPageUI: FC<UnitsPageUIProps> = ({
  headers,
  units,
  showModal,
  handleShowModal,
  handleCloseModal,
}) => (
  <>
    <BasePage title="Единицы измерения">
      <div className="content">
        <Table<TUnit> headers={headers} elements={units} />
        <div>
          <Button
            type="plus"
            children="Добавить ЕИ"
            className="actionButton"
            onClick={handleShowModal}
          />
        </div>
      </div>
    </BasePage>
    {showModal && (
      <Modal onClose={handleCloseModal}>
        <AddUnitForm onClose={handleCloseModal} />
      </Modal>
    )}
  </>
);
