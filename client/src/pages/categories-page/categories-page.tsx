import { useModal } from '@hooks/useModal';
import { getCategoriesSelector } from "@slices/categories";
import { useSelector } from "@store";
import { CategoriesPageUI } from "@ui/pages";

export const CategoriesPage = () => {
  const categories = useSelector(getCategoriesSelector);
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  return (
    <CategoriesPageUI
      categories={categories}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
