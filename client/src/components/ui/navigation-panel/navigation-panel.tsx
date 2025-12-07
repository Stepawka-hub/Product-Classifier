import { FC } from "react";
import { NavigationPanelUIProps } from "./type";
import { Button } from "@components/common/buttons";
import { BurgerMenu } from "@components/common/burger-menu";
import { Link } from "@ui/common/link";
import s from "./navigation-panel.module.css";

export const NavigationPanelUI: FC<NavigationPanelUIProps> = ({
  isFillingData,
  isClearingData,
  fillData,
  clearData,
  isMobile = false,
  isOpen = false,
  onToggle,
}) => (
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
          <Link to="/">- На главную</Link>
          <Link to="/classifiers">- Классификаторы</Link>
          <Link to="/products">- Изделия</Link>
          <Link to="/specifications">- Позиции спецификаций</Link>
          <Link to="/units">- Единицы измерения</Link>
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
            children={isClearingData ? "Очистка данных..." : "Очистить данные"}
            extraClass={s.button}
            disabled={isClearingData}
            onClick={clearData}
          />
        </div>
      </>
    )}
  </div>
);
