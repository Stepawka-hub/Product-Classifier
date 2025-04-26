/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Route, Routes } from "react-router";

import { AppPreloader } from "@components/app-preloader";
import { ModalProvider } from "@components/modal-provider/modal-provider";
import { NotFound } from "@components/not-found";
import { Sidebar } from "@components/sidebar/sidebar";
import { ToastList } from "@components/toast-list";
import { CategoriesPage, HomePage, ProductsPage, UnitsPage } from "@pages";
import { getIsInitializedSelector } from "@slices/app";
import { useDispatch, useSelector } from "@store";
import { initialize } from "@thunks/app";
import s from "./app.module.css";

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
      <div className={s.sidebar}>
        <Sidebar />
      </div>

      <ModalProvider>
        <div className={s.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/units" element={<UnitsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ModalProvider>

      <ToastList />
    </div>
  );
};
