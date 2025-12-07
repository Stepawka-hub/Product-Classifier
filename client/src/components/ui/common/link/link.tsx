import { FC } from "react";
import { NavLink } from "react-router-dom";
import { TLinkProps } from "./types";
import clsx from "clsx";
import s from "./link.module.css";

export const Link: FC<TLinkProps> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx("link", s.link, {
        [s.link_active]: isActive,
      })
    }
  >
    {children}
  </NavLink>
);
