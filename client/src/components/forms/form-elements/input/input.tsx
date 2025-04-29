import { FC } from "react";
import { InputProps } from "./type";
import s from "./input.module.css";

export const Input: FC<InputProps> = ({ id, label, required, ...props }) => (
  <>
    <div>
      <label className={s.label} htmlFor={id}>
        {label}
        {required === true && <span className={s.required}> *</span>}
      </label>
      <input
        id={id}
        className={s.input}
        placeholder={label}
        required={required}
        {...props}
      />
    </div>
  </>
);
