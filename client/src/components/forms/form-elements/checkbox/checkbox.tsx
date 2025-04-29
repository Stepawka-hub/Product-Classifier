import { FC } from "react";
import { CheckboxProps } from "./type";
import s from "./checkbox.module.css";

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  required,
  ...props
}) => (
  <>
    <div className={s.checkboxContainer}>
      <label className={s.label} htmlFor={id}>
        {label}
        {required === true && <span className={s.required}> *</span>}
      </label>
      <input
        id={id}
        type="checkbox"
        className={s.checkbox}
        required={required}
        {...props}
      />
    </div>
  </>
);
