import { FC, memo } from "react";
import { ModalPropsUI } from "./type";
import s from "./modal.module.css";

export const ModalUI: FC<ModalPropsUI> = memo(
  ({ children, onOverlayClick, onClose }) => (
    <div className={s.modalOverlay} onClick={onOverlayClick}>
      <div className={s.modal}>
        {children}
        <span className={s.modalClose} onClick={onClose} />
      </div>
    </div>
  )
);
