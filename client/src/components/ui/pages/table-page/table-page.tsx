import { Button } from "@components/common/buttons";
import { BasePage } from "@pages";
import { Table } from "@components/table";
import { TablePageUIProps } from "./type";
import s from "./table-page.module.css";
import { TEntity } from "@utils/types";

export const TablePageUI = <T extends TEntity>({
  title,
  addButtonLabel,
  openModal,
  tableConfig,
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
            variant="plus"
            children={addButtonLabel}
            className={s.actionButton}
            onClick={openModal}
          />
        </div>
      </div>
    </BasePage>
  </>
);
