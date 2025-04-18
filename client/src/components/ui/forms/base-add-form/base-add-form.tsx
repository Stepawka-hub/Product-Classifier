import { Button } from "@components/common/buttons";
import { FC } from "react";
import { BaseAddFormUIProps } from "./type";
import s from "./base-add-form.module.css";
import clsx from "clsx";

export const BaseAddFormUI: FC<BaseAddFormUIProps> = ({
  children,
  onSubmit,
  onClose,
}) => {
  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className={s.inputs}>{children}</div>
      <div className={s.buttons}>
        <Button children="Добавить" extraClass={clsx(s.btn, s.addBtn)} />
        <Button
          children="Отмена"
          extraClass={clsx(s.btn, s.cancelBtn)}
          onClick={onClose}
        />
      </div>
    </form>
  );
};
