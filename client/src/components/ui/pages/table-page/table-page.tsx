import { Button } from "@components/common/buttons";
import { BasePage } from "@pages";
import { Table } from "@components/table";
import { TablePageUIProps } from "./type";
import s from "./table-page.module.css";
import { TEntity } from "@utils/types";

export const TablePageUI = <T extends TEntity>({
  title,
  addButtonLabel,
  tableConfig,
  pagination,
  openAddForm,
  additionalActions,
}: TablePageUIProps<T>) => (
  <>
    <BasePage title={title}>
      <div className={s.content}>
        {tableConfig.data.length ? (
          <Table<T> pagination={pagination} {...tableConfig} />
        ) : (
          <span className={s.noData}>Данных не найдено!</span>
        )}
        <div className={s.actions}>
          <Button
            variant="plus"
            children={addButtonLabel}
            onClick={openAddForm}
          />
          {additionalActions}
        </div>
      </div>
    </BasePage>
  </>
);
