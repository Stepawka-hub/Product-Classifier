import { FC } from "react";
import { BasePageProps } from "./type";
import { BasePageUI } from "@ui-pages";

export const BasePage: FC<BasePageProps> = ({ title }) => (
  <BasePageUI title={title} />
);
