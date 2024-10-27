import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { stopPropagation } from "@/functions/utils";

interface Props extends PropsWithChildren {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const Modal: React.FC<Props> = ({ open, setOpen, title, children }) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-black/65 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10" onClick={stopPropagation}>
        <div className="flex h-screen items-center justify-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden sm:rounded-2xl bg-white  shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in w-full sm:max-w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white h-screen sm:h-full">
              <div className="mt-7 sm:mt-2 w-full relative">
                <DialogTitle
                  as="h3"
                  className="text-base text-center border-b font-bold leading-6 text-gray-900 pb-4"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2 pb-2 px-2">{children}</div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
