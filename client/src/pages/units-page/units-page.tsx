import { getUnitsSelector } from "@slices/units";
import { useSelector } from "@store";
import { UnitsPageUI } from "@ui-pages";
import { unitHeaders } from "@utils/constants";
import { useState } from "react";

export const UnitsPage = () => {
  const units = useSelector(getUnitsSelector);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <UnitsPageUI
      headers={unitHeaders}
      units={units}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
