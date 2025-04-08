import { FC } from "react";
import { BasePageProps } from "./type";
import { BasePageUI } from "@ui-pages";

export const BasePage: FC<BasePageProps> = ({ title, children }) => (
  <BasePageUI title={title} children={children} />
);
