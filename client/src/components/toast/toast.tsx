/* eslint-disable react-hooks/exhaustive-deps */
import { removeToast } from "@slices/toasts";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastProps } from "./type";

import { ToastUI } from "@components/ui/toast";

export const Toast: FC<ToastProps> = ({ id, type, text, duration }) => {
  const dispatch = useDispatch();

  const closeToast = () => {
    dispatch(removeToast(id));
  };

  useEffect(() => {
    const timerId = setTimeout(closeToast, duration);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <ToastUI
      type={type}
      text={text}
      closeToast={closeToast}
    />
  );
};
