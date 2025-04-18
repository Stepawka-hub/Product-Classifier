import { AddCategoryForm } from '@components/forms';
import { TablePage } from "@pages";
import { TCategory } from "@utils/types";
import { FC } from 'react';
import { CategoriesPageUIProps } from './type';
import { categoriesHeaders } from '@utils/constants';

export const CategoriesPageUI: FC<CategoriesPageUIProps> = ({
  categories,
  showModal,
  handleShowModal,
  handleCloseModal,
}) => (
  <TablePage<TCategory>
    title="Категории"
    headers={categoriesHeaders}
    data={categories}
    addButtonLabel="Добавить категорию"
    renderModal={<AddCategoryForm onClose={handleCloseModal} />}
    isModalOpen={showModal}
    onOpenModal={handleShowModal}
    onCloseModal={handleCloseModal}
  />
);
