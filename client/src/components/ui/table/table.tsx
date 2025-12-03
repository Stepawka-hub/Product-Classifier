import { Pagination } from "@components/pagination/pagination";
import { TableProps } from "./type";
import { TableHeader, TableRow } from "@components/table-elements";
import { TEntity } from "@utils/types";
import s from "./table.module.css";

export const Table = <T extends TEntity>({
  headers,
  data,
  pagination,
  selectable = true,
  selectedItemId,
  setSelectedItem,
}: TableProps<T>) => {
  const { totalCount, pageSize, currentPage, setCurrentPage } = pagination;

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <table className={s.table}>
          <TableHeader headers={[...Object.values(headers)]} />
          <tbody className={s.tbody}>
            {data.map((rowData) => (
              <TableRow
                key={rowData.id}
                headers={headers}
                rowData={rowData}
                selectable={selectable}
                selectedItemId={selectedItemId}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
