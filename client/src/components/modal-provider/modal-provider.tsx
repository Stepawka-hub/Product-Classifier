import { Modal } from "@components/modal/modal";
import { memo, ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { ModalContext } from "./modal-context";

export const ModalProvider = memo(({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [onCloseCallback, setOnCloseCallback] = useState<() => void>();

  const showModal = useCallback((content: ReactNode, onClose?: () => void) => {
    setModalContent(content);
    setIsOpen(true);
    setOnCloseCallback(() => onClose);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const contextValue = useMemo(
    () => ({ showModal, hideModal }),
    [showModal, hideModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal
        isOpen={isOpen}
        nodeRef={nodeRef}
        onCloseCallback={onCloseCallback}
        onClose={hideModal}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
});
