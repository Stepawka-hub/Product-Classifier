import { TablePage } from "@pages";
import { TUnit } from "@utils/types";
import { FC } from "react";
import { UnitsPageUIProps } from "./type";

export const UnitsPageUI: FC<UnitsPageUIProps> = (props) => (
  <TablePage<TUnit>
    title="Единицы измерения"
    addButtonLabel="Добавить ЕИ"
    {...props}
  />
);
