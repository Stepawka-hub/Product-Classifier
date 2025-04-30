import { FC, FormEventHandler } from "react";
import s from "./base-form.module.css";
import { BaseFormProps } from "../types";
import { Button } from "@components/common/buttons";
import clsx from "clsx";

export const BaseForm: FC<BaseFormProps> = ({
  title,
  btnLabel,
  isProgress = false,
  children,
  onClose,
  onSubmit,
}) => {
  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <div className={s.formContainer}>
      <h2 className={s.title}>{title}</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.inputs}>{children}</div>
        <div className={s.buttons}>
          <Button
            children={isProgress ? btnLabel.disabled : btnLabel.default}
            type="submit"
            disabled={isProgress}
            extraClass={clsx(s.btn, s.submitBtn)}
          />
          <Button
            children="Отмена"
            extraClass={clsx(s.btn, s.cancelBtn)}
            onClick={onClose}
          />
        </div>
      </form>
    </div>
  );
};
