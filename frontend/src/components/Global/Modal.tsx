import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Dialog } from "@headlessui/react";

interface Props extends PropsWithChildren {
  component: ReactNode;
}

const Modal: React.FC<Props> = ({ children, component }) => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <span onClick={open}>{children}</span>
      <Dialog
        open={isOpen}
        as="div"
        className="absolute z-40 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-40 bg-black/50 w-screen">
          <div className="flex min-h-full items-center justify-center p-4">
            {component}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
