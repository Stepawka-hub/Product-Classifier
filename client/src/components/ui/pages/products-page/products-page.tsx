import { AddProductForm } from '@components/forms';
import { TablePage } from "@pages";
import { productsHeaders } from '@utils/constants';
import { TProduct } from "@utils/types";
import { FC } from "react";
import { ProductsPageUIProps } from "./type";

export const ProductsPageUI: FC<ProductsPageUIProps> = ({
  products,
  showModal,
  handleShowModal,
  handleCloseModal,
}) => (
  <TablePage<TProduct>
    title="Продукты"
    headers={productsHeaders}
    data={products}
    addButtonLabel="Добавить продукт"
    renderModal={<AddProductForm onClose={handleCloseModal} />}
    isModalOpen={showModal}
    onOpenModal={handleShowModal}
    onCloseModal={handleCloseModal}
  />
);
