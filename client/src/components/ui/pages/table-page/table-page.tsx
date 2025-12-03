import { TablePageProps } from "./type";
import { TEntity } from "@utils/types";
import { BasePage } from "@ui/pages";
import { Table } from "@ui/table";
import s from "./table-page.module.css";

export const TablePage = <T extends TEntity>({
  title,
  tableConfig,
  pagination,
  headerActions,
  footerActions,
  selectedItemId,
  setSelectedItem,
}: TablePageProps<T>) => (
  <BasePage title={title}>
    <div className={s.content}>
      {headerActions}
      {tableConfig.data.length ? (
        <Table<T>
          pagination={pagination}
          selectedItemId={selectedItemId}
          setSelectedItem={setSelectedItem}
          {...tableConfig}
        />
      ) : (
        <span className={s.noData}>Данных не найдено!</span>
      )}
      <div className={s.footerActions}>{footerActions}</div>
    </div>
  </BasePage>
);
