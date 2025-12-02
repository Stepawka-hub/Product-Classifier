import { Pagination } from "@components/pagination/pagination";
import { TableProps } from "./type";
import { TableHeader, TableRow } from "@components/table-elements";
import { TEntity } from "@utils/types";
import s from "./table.module.css";

export const Table = <T extends TEntity>({
  headers,
  data,
  pagination,
  actions,
}: TableProps<T>) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <table className={s.table}>
          <TableHeader
            headers={[...Object.values(headers)]}
            showActionsColumn={!!actions}
          />
          <tbody className={s.tbody}>
            {data.map((rowData) => (
              <TableRow key={rowData.id} headers={headers} rowData={rowData} />
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          totalCount={pagination.totalCount}
          pageSize={pagination.pageSize}
          currentPage={pagination.currentPage}
          setCurrentPage={pagination.setCurrentPage}
        />
      )}
    </div>
  );
};
