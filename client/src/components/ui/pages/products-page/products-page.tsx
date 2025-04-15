import { FC } from "react";
import { BasePage } from "@pages";
import { Button } from "@components/common/buttons";
import { ProductsPageUIProps } from "./type";
import { Table } from "@components/table";
import { TProduct } from '@utils/types';

export const ProductsPageUI: FC<ProductsPageUIProps> = ({
  headers,
  products,
  addProduct,
}) => (
  <BasePage title="Изделия">
    <div className="content">
      <Table<TProduct> headers={headers} elements={products} />
      <div>
        <Button
          type="plus"
          children="Добавить продукт"
          className="actionButton"
          onClick={addProduct}
        />
      </div>
    </div>
  </BasePage>
);
