import { ModalUI } from "@ui/modal";
import { FC, memo, MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import { TModalProps } from "./type";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = memo(({ isOpen, children, onClose }) => {
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

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <ModalUI onOverlayClick={handleOverlayClick} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot!
  );
});
