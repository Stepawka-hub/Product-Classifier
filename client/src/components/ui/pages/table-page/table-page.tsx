import { Button } from "@components/common/buttons";
import { BasePage } from "@pages";
import { Table } from "@components/table";
import { TablePageUIProps } from "./type";
import { Modal } from "@components/modal";
import s from "./table-page.module.css";

export const TablePageUI = <T extends object>({
  title,
  addButtonLabel,
  tableConfig,
  modalConfig,
  pagination,
}: TablePageUIProps<T>) => (
  <>
    <BasePage title={title}>
      <div className={s.content}>
        {tableConfig.data.length ? (
          <Table<T>
            headers={tableConfig.headers}
            data={tableConfig.data}
            pagination={pagination}
            onEdit={tableConfig.onEdit}
            onDelete={tableConfig.onDelete}
          />
        ) : (
          <span className={s.noData}>Данных не найдено!</span>
        )}
        <div>
          <Button
            type="plus"
            children={addButtonLabel}
            className={s.actionButton}
            onClick={modalConfig.onOpen}
          />
        </div>
      </div>
    </BasePage>
    {modalConfig.isOpen && (
      <Modal onClose={modalConfig.onClose}>{modalConfig.renderModal}</Modal>
    )}
  </>
);
