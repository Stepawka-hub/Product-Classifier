import { Button } from "@components/common/buttons";
import { FC } from "react";
import { BaseAddFormUIProps } from "./type";

export const BaseAddFormUI: FC<BaseAddFormUIProps> = ({
  children,
  onSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>{children}</div>
      <div>
        <Button children="Добавить" />
        <Button children="Отмена" onClick={onClose} />
      </div>
    </form>
  );
};
