import { FC, memo } from "react";
import { CSSTransition } from "react-transition-group";
import s from "./modal.module.css";
import { ModalPropsUI } from "./type";

export const ModalUI: FC<ModalPropsUI> = memo(
  ({ isOpen, nodeRef, children, onOverlayClick, onClose }) => (
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={500}
      classNames={{
        enter: s.modalEnter,
        enterActive: s.modalEnterActive,
        exit: s.modalExit,
        exitActive: s.modalExitActive,
      }}
      unmountOnExit
    >
      <div ref={nodeRef} className={s.modal}>
        <div className={s.modalOverlay} onClick={onOverlayClick}>
          <div className={s.modalContent}>
            {children}
            <button className={s.modalClose} onClick={onClose} />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
);
