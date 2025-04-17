import { FC, useEffect } from "react";
import { ModalProps } from "./type";
import { ModalUI } from "@ui/modal";
import { createPortal } from "react-dom";

export const Modal: FC<ModalProps> = ({ children, delay, onClose }) => {
  const modalRoot = document.getElementById("root");

  useEffect(() => {
    if (delay === undefined) return;
    const timerId = setTimeout(onClose, delay);

    return () => clearTimeout(timerId);
  }, [delay, onClose]);

  return createPortal(
    <ModalUI onClose={onClose}>{children}</ModalUI>,
    modalRoot!
  );
};
