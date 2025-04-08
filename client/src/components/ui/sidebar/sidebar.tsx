import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./sidebar.module.css";
import clsx from "clsx";
import { Button } from "@components/common/buttons";
import { SidebarUIProps } from "./type";

export const SidebarUI: FC<SidebarUIProps> = ({ fillData, clearData }) => (
  <aside className={s.sidebar}>
    <div className={s.titleContainer}>
      <h2 className={s.title}>Классификатор изделий</h2>
    </div>
    <div className={s.links}>
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
        children="Заполнить данные"
        extraClass={s.button}
        onClick={fillData}
      />
      <Button
        children="Очистить данные"
        extraClass={s.button}
        onClick={clearData}
      />
    </div>
  </aside>
);
