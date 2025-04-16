import { getToastsSelector } from "@slices/toasts";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Toast } from "@components/toast";
import { ToastListUI } from "@components/ui/toast-list";

export const ToastList: FC = () => {
  const toasts = useSelector(getToastsSelector);
  console.log(toasts);

  const toastElements = toasts.map((t) => (
    <Toast
      key={t.id}
      id={t.id}
      type={t.type}
      text={t.message}
      duration={t.duration}
    />
  ));

  return <ToastListUI toastElements={toastElements} />;
};
