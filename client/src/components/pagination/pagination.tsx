import { FC } from "react";
import s from "./Pagination.module.css";
import { PaginationProps } from "./type";
import clsx from "clsx";

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const firstPage = currentPage - 4 < 0 ? 0 : currentPage - 4;
  const lastPage = currentPage + 3;
  const slicedPages = pages.slice(firstPage, lastPage);

  return (
    <div className={s.pagination}>
      {slicedPages.map((number) => (
        <span
          className={clsx(s.pagination__item, {
            [s.active]: currentPage === number,
          })}
          onClick={() => setCurrentPage(number)}
          key={number}
        >
          {number}
        </span>
      ))}
    </div>
  );
};
