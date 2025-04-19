import { TProduct } from "@utils/types";
import { ModalHandlers } from "../types/types";
import { TPagination } from '@components/pagination/type';

export type ProductsPageUIProps = ModalHandlers & {
  products: TProduct[];
  pagination?: TPagination;
};
