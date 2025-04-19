import { Button } from "@components/common/buttons";
import clsx from "clsx";
import { FC, FormEventHandler } from "react";
import s from "./base-add-form.module.css";
import { BaseAddFormUIProps } from "./type";

export const BaseAddFormUI: FC<BaseAddFormUIProps> = ({
  children,
  isAdding,
  onSubmit,
  onClose,
}) => {
  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.inputs}>{children}</div>
      <div className={s.buttons}>
        <Button
          children={isAdding ? "Добавление..." : "Добавить"}
          disabled={isAdding}
          extraClass={clsx(s.btn, s.addBtn)}
        />
        <Button
          children="Отмена"
          extraClass={clsx(s.btn, s.cancelBtn)}
          onClick={onClose}
        />
      </div>
    </form>
  );
};
