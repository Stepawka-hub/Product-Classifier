import { TablePageUIProps } from "./type";
import { TEntity } from "@utils/types";
import { BasePage } from "@ui/pages";
import { Table } from "@ui/table";
import s from "./table-page.module.css";

export const TablePage = <T extends TEntity>({
  title,
  tableConfig,
  pagination,
}: TablePageUIProps<T>) => (
  <BasePage title={title}>
    <div className={s.content}>
      {tableConfig.data.length ? (
        <Table<T> pagination={pagination} {...tableConfig} />
      ) : (
        <span className={s.noData}>Данных не найдено!</span>
      )}
    </div>
  </BasePage>
);
