import { FC } from "react";
import { NavLink } from "react-router-dom";
import { TLinkProps } from "./types";
import clsx from "clsx";
import s from "./link.module.css";

export const Link: FC<TLinkProps> = ({ children, ...props }) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      clsx("link", s.link, {
        [s.link_active]: isActive,
      })
    }
  >
    {children}
  </NavLink>
);
