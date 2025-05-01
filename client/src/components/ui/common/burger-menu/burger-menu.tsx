import clsx from "clsx";
import { FC } from "react";
import { BurgerMenuUIProps } from "./type";
import s from "./burger-menu.module.css";

export const BurgerMenuUI: FC<BurgerMenuUIProps> = ({ isOpen, onToggle }) => (
  <button
    className={s.burgerButton}
    onClick={onToggle}
    aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
  >
    <span className={clsx(s.burgerLine, { [s.burgerLine_active]: isOpen })} />
    <span className={clsx(s.burgerLine, { [s.burgerLine_active]: isOpen })} />
    <span className={clsx(s.burgerLine, { [s.burgerLine_active]: isOpen })} />
  </button>
);
