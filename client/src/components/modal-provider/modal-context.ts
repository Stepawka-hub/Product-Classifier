import { createContext, ReactNode } from "react";

type TModalContext = {
  showModal: (content: ReactNode, onClose?: () => void) => void;
  hideModal: () => void;
};

export const ModalContext = createContext<TModalContext>({
  showModal: () => {},
  hideModal: () => {},
});
