import { useModal } from '@hooks/useModal';
import { getUnitsSelector } from "@slices/units";
import { useSelector } from "@store";
import { UnitsPageUI } from "@ui-pages";

export const UnitsPage = () => {
  const units = useSelector(getUnitsSelector);
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  return (
    <UnitsPageUI
      units={units}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
