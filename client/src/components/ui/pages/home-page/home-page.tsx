import { FC } from "react";
import s from "./home-page.module.css";
import { BasePage } from "@pages";

export const HomePageUI: FC = () => (
  <BasePage>
    <section className={s.home}>
      <h2 className={s.home__title}>Добро пожаловать!</h2>
      <p className={s.home__text}>Для начала работы выберите нужный раздел</p>
    </section>
  </BasePage>
);
