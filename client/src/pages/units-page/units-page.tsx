import { Loader } from "@components/common/loader";
import { useModal } from "@hooks/useModal";
import { getIsLoadingSelector, getUnitsSelector } from "@slices/units";
import { useDispatch, useSelector } from "@store";
import { getAllUnitsAsync } from "@thunks/units";
import { UnitsPageUI } from "@ui-pages";
import { useEffect } from "react";

export const UnitsPage = () => {
  const dispatch = useDispatch();
  const units = useSelector(getUnitsSelector);
  const isLoading = useSelector(getIsLoadingSelector);
  const { showModal, handleShowModal, handleCloseModal } = useModal();

  useEffect(() => {
    dispatch(getAllUnitsAsync());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <UnitsPageUI
      units={units}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleCloseModal={handleCloseModal}
    />
  );
};
