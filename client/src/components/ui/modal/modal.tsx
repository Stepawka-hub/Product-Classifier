import { FC } from "react";
import { ModalPropsUI } from "./type";
import s from "./modal.module.css";

export const ModalUI: FC<ModalPropsUI> = ({ children, onClose }) => (
  <div className={s.modalOverlay}>
    <div className={s.modal}>
      {children}
      <span className={s.modalClose} onClick={onClose} />
    </div>
  </div>
);
