import { FC } from "react";
import { TBaseTableActions } from "./type";
import { Button } from "@components/common/buttons";
import s from "./base-table-actions.module.css";

export const BaseTableActions: FC<TBaseTableActions> = ({
  isAdding = false,
  isUpdating = false,
  isRemoving = false,
  isSelected = false,
  onAddButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
}) => {
  return (
    <div className={s.actions}>
      {onAddButtonClick && (
        <Button
          title="Добавить"
          variant="plus"
          size="small"
          disabled={isAdding}
          onClick={onAddButtonClick}
        />
      )}
      {onEditButtonClick && (
        <Button
          title={isSelected ? "Редактировать" : "Выберите строку"}
          variant="edit"
          size="small"
          disabled={!isSelected || isUpdating}
          onClick={onEditButtonClick}
        />
      )}
      {onDeleteButtonClick && (
        <Button
          title={isSelected ? "Удалить" : "Выберите строку"}
          variant="cross"
          size="small"
          disabled={!isSelected || isRemoving}
          onClick={onDeleteButtonClick}
        />
      )}
    </div>
  );
};
