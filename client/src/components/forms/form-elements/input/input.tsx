import { FC } from "react";
import { InputProps } from "./type";
import s from "./input.module.css";

export const Input: FC<InputProps> = ({ label, required, ...props }) => (
  <>
    <div>
      <label className={s.label}>
        {label}
        {required === true && <span className={s.required}> *</span>}
      </label>
      <input
        className={s.input}
        placeholder={label}
        required={required}
        {...props}
      />
    </div>
  </>
);
