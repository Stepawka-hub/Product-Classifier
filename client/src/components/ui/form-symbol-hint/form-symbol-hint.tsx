import { FC } from "react";
import s from "./form-symbol-hint.module.css";
import { TFormSymbolHintProps } from "./types";

export const FormSymbolHint: FC<TFormSymbolHintProps> = ({
  label = "Элементы в списке необходимо разделять знаком",
  symbol = ";",
}) => (
  <div className={s.hint}>
    <p>
      {label} <span className={s.symbol}>{symbol}</span>
    </p>
    <p>
      Пример: <span className={s.example}>1 ; 5 ; 8</span>
    </p>
  </div>
);
