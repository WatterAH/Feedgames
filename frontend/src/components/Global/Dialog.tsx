import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Dialog, DialogBackdrop } from "@headlessui/react";

interface Props extends PropsWithChildren {
  opener: ReactNode;
}

const Modal: React.FC<Props> = ({ opener, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>{opener}</button>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        {children}
      </Dialog>
    </>
  );
};

export default Modal;
