import { FC, memo } from "react";
import { ModalPropsUI } from "./type";
import s from "./modal.module.css";
import clsx from "clsx";

export const ModalUI: FC<ModalPropsUI> = memo(
  ({ isOpen, children, onOverlayClick, onClose }) => (
    <div
      className={clsx(s.modalOverlay, {
        [s.active]: isOpen,
      })}
      onClick={onOverlayClick}
    >
      <div className={s.modal}>
        {children}
        <span className={s.modalClose} onClick={onClose} />
      </div>
    </div>
  )
);
