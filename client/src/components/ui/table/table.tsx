import { Pagination } from "@components/pagination/pagination";
import s from "./table.module.css";
import { TableUIProps } from "./type";
import { TableHeader, TableRow } from "@components/table-elements";
import { TEntity } from "@utils/types";
import { checkInProgress } from "@utils/helpers/array";

export const TableUI = <T extends TEntity>({
  headers,
  data,
  pagination,
  isRemoving,
  onEdit,
  onDelete,
}: TableUIProps<T>) => (
  <>
    <div className={s.tableContainer}>
      <table className={s.table}>
        <TableHeader headers={Object.values(headers)} />
        <tbody className={s.tbody}>
          {data.map((rowData) => (
            <TableRow
              key={rowData.id}
              headers={headers}
              rowData={rowData}
              isRemoving={checkInProgress(isRemoving, rowData.id)}
              onEdit={() => onEdit(rowData)}
              onDelete={onDelete}
            />
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
  </>
);
