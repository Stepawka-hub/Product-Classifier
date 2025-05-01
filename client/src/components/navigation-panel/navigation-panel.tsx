import { useDeviceDetect } from "@hooks/useDeviceDetect";
import {
  getIsClearingDataSelector,
  getIsFillingDataSelector,
} from "@slices/app";
import { useDispatch, useSelector } from "@store";
import { clearDataAsync, fillDataAsync } from "@thunks/app";
import { NavigationPanelUI } from "@ui/navigation-panel";
import { FC, useState } from "react";

export const NavigationPanel: FC = () => {
  const dispatch = useDispatch();
  const { isMobile } = useDeviceDetect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFillingData = useSelector(getIsFillingDataSelector);
  const isClearingData = useSelector(getIsClearingDataSelector);
  const Container = isMobile ? "header" : "aside";

  const fillData = () => {
    dispatch(fillDataAsync());
  };

  const clearData = () => {
    dispatch(clearDataAsync());
  };

  const props = {
    isFillingData,
    isClearingData,
    fillData,
    clearData,
    isMobile,
    isOpen: isMenuOpen,
    onToggle: () => setIsMenuOpen(!isMenuOpen),
  };

  return (
    <Container>
      <NavigationPanelUI {...props} />
    </Container>
  );
};
