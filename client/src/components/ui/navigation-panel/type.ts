export type NavigationPanelProps = {
  isFillingData: boolean;
  isClearingData: boolean;
  fillData: () => void;
  clearData: () => void;

  isMobile: boolean,
  isOpen: boolean,
  onToggle: () => void,
}