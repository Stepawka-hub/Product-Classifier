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
  actions,
}: TableUIProps<T>) => {
  const { deletion } = actions || {};
  const { removingIds } = deletion || {};

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
              <TableRow
                key={rowData.id}
                headers={headers}
                rowData={rowData}
                isRemoving={
                  removingIds ? checkInProgress(removingIds, rowData.id) : false
                }
                actions={actions}
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
    </div>
  );
};
