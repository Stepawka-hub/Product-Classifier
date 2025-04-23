import { TablePage } from "@pages";
import { TProduct } from "@utils/types";
import { FC } from "react";
import { ProductsPageUIProps } from "./type";

export const ProductsPageUI: FC<ProductsPageUIProps> = (props) => (
  <TablePage<TProduct>
    title="Изделия"
    addButtonLabel="Добавить изделие"
    {...props}
  />
);
