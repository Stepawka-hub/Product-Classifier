/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router";
import { FC, useEffect } from "react";

import s from "./app.module.css";
import { useDispatch, useSelector } from "@store";
import { getIsInitializedSelector } from "@slices/app";
import { initialize } from "@thunks/app";
import { AppPreloader } from "@components/app-preloader";
import { Sidebar } from "@components/sidebar/sidebar";
import { HomePage, ProductsPage, CategoriesPage, UnitsPage } from "@pages";
import { NotFound } from "@components/not-found";

export const App: FC = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(getIsInitializedSelector);

  useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!isInitialized) {
    return <AppPreloader />;
  }

  return (
    <div className={s.wrapper}>
      <div></div>

      <div className={s.sidebar}>
        <Sidebar />
      </div>

      <div className={s.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
