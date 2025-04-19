import { FC } from "react";
import { SidebarUI } from "@ui/sidebar";
import { useDispatch, useSelector } from "@store";
import { clearDataAsync, fillDataAsync } from "@thunks/app";
import {
  getIsClearingDataSelector,
  getIsFillingDataSelector,
} from "@slices/app";

export const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const isFillingData = useSelector(getIsFillingDataSelector);
  const isClearingData = useSelector(getIsClearingDataSelector);

  const fillData = () => {
    dispatch(fillDataAsync());
  };

  const clearData = () => {
    dispatch(clearDataAsync());
  };

  return (
    <SidebarUI
      isFillingData={isFillingData}
      isClearingData={isClearingData}
      fillData={fillData}
      clearData={clearData}
    />
  );
};
