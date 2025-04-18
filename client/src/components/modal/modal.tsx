import { ModalUI } from "@ui/modal";
import { FC, MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./type";

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById("root");

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, []);

  const closeByEsc = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick: MouseEventHandler = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalUI onOverlayClick={handleOverlayClick} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot!
  );
};
