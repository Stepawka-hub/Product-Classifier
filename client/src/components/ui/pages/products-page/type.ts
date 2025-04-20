import { TPagination, TProduct } from "@utils/types";
import { ModalHandlers } from "../types/types";

export type ProductsPageUIProps = ModalHandlers & {
  products: TProduct[];
  pagination?: TPagination;
};
