import { Modal } from "@components/modal/modal";
import { memo, ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { ModalContext } from "./modal-context";

export const ModalProvider = memo(({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const clearExistingTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const showModal = useCallback((content: ReactNode) => {
    setIsOpen(true);
    setContent(content);
    clearExistingTimeout();
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
    timeoutRef.current = setTimeout(() => {
      setContent(null);
      clearExistingTimeout();
    }, 500);
  }, []);

  const contextValue = useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal isOpen={isOpen} onClose={hideModal}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
});
