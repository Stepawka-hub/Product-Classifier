export type TBaseTableActions = {
  isAdding?: boolean;
  isUpdating?: boolean;
  isRemoving?: boolean;
  isSelected?: boolean;
  onAddButtonClick?: () => void;
  onEditButtonClick?: () => void;
  onDeleteButtonClick?: () => void;
}