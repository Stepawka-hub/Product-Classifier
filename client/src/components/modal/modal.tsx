import { ModalUI } from "@ui/modal";
import { FC, memo, MouseEventHandler, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { TModalProps } from "./type";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = memo(({ isOpen, children, onClose }) => {
  const closeByEsc = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick: MouseEventHandler = useCallback(
    (evt) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, [closeByEsc]);

  return createPortal(
    <ModalUI
      isOpen={isOpen}
      onOverlayClick={handleOverlayClick}
      onClose={onClose}
    >
      {children}
    </ModalUI>,
    modalRoot!
  );
});
