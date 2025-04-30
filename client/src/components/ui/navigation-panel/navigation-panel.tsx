import { FC } from "react";
import { NavigationPanelProps } from "./type";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@components/common/buttons";
import s from "./navigation-panel.module.css";
import { BurgerMenu } from "@components/common/burger-menu";

export const NavigationPanelUI: FC<NavigationPanelProps> = ({
  isFillingData,
  isClearingData,
  fillData,
  clearData,
  isMobile = false,
  isOpen = false,
  onToggle,
}) => (
  <>
    <div className={s.navigation}>
      <div className={s.header}>
        <div className={s.titleContainer}>
          <h2 className={s.title}>Классификатор изделий</h2>
        </div>
        {isMobile && <BurgerMenu isOpen={isOpen} onToggle={onToggle} />}
      </div>

      {(!isMobile || isOpen) && (
        <>
          <div className={s.links}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx("link", s.link, {
                  [s.link_active]: isActive,
                })
              }
            >
              - На главную
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                clsx("link", s.link, {
                  [s.link_active]: isActive,
                })
              }
            >
              - Изделия
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                clsx("link", s.link, {
                  [s.link_active]: isActive,
                })
              }
            >
              - Категории
            </NavLink>
            <NavLink
              to="/units"
              className={({ isActive }) =>
                clsx("link", s.link, {
                  [s.link_active]: isActive,
                })
              }
            >
              - Единицы измерения
            </NavLink>
          </div>
          <div className={s.buttons}>
            <Button
              children={
                isFillingData ? "Заполнение данных..." : "Заполнить данные"
              }
              extraClass={s.button}
              disabled={isFillingData}
              onClick={fillData}
            />
            <Button
              children={
                isClearingData ? "Очистка данных..." : "Очистить данные"
              }
              extraClass={s.button}
              disabled={isClearingData}
              onClick={clearData}
            />
          </div>
        </>
      )}
    </div>
  </>
);
