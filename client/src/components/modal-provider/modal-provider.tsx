import { Modal } from "@components/modal/modal";
import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { ModalContext } from "./modal-context";

export const ModalProvider = memo(({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const showModal = useCallback((content: ReactNode) => {
    setIsOpen(true);
    setContent(content);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
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
