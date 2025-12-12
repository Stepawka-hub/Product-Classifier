import { FC, useEffect } from "react";
import { Route, Routes } from "react-router";

import { AppPreloader } from "@components/app-preloader";
import { ModalProvider } from "@components/modal-provider/modal-provider";
import { NotFound } from "@components/not-found";
import { ToastList } from "@components/toast-list";
import { NavigationPanel } from "@components/navigation-panel";
import {
  ClassifiersPage,
  HomePage,
  ProductsPage,
  UnitsPage,
  SpecificationsPage,
  TotalConsumptionPage,
} from "@pages";
import { getIsInitializedSelector } from "@slices/app";
import { useDispatch, useSelector } from "@store";
import { initialize } from "@thunks/app";
import s from "./app.module.css";

export const App: FC = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(getIsInitializedSelector);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  if (!isInitialized) {
    return <AppPreloader />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.navigation}>
        <NavigationPanel />
      </div>

      <ModalProvider>
        <div className={s.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products">
              <Route index element={<ProductsPage />} />
              <Route
                path=":productId/total-consumption"
                element={<TotalConsumptionPage />}
              />
              <Route path="specifications" element={<SpecificationsPage />} />
            </Route>
            <Route path="/classifiers" element={<ClassifiersPage />} />
            <Route path="/units" element={<UnitsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ModalProvider>

      <ToastList />
    </div>
  );
};
