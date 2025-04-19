import { Button } from "@components/common/buttons";
import { BasePage } from "@pages";
import { Table } from "@components/table";
import { TablePageUIProps } from "./type";
import { Modal } from "@components/modal";
import s from "./table-page.module.css";

export const TablePageUI = <T extends object>({
  title,
  headers,
  data,
  addButtonLabel,
  renderModal,
  isModalOpen,
  pagination,
  onOpenModal,
  onCloseModal,
}: TablePageUIProps<T>) => (
  <>
    <BasePage title={title}>
      <div className={s.content}>
        <Table<T> headers={headers} data={data} pagination={pagination} />
        <div>
          <Button
            type="plus"
            children={addButtonLabel}
            className={s.actionButton}
            onClick={onOpenModal}
          />
        </div>
      </div>
    </BasePage>
    {isModalOpen && <Modal onClose={onCloseModal}>{renderModal}</Modal>}
  </>
);
