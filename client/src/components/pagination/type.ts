export type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export type TPagination = PaginationProps;