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
  setOpen: (open: boolean) => void;
  title: string;
  onClose?: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  full?: boolean;
}

const Modal: React.FC<Props> = ({
  open,
  setOpen,
  title,
  children,
  onClose,
  size = "xl",
  full = true,
}) => {
  const sizeClasses = {
    xs: "sm:max-w-xs",
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  };

  const maxWidthClass = sizeClasses[size] || "sm:max-w-xl";

  return (
    <Dialog open={open} onClose={onClose ?? setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-black/65 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div
        className={`fixed inset-0 z-10 ${!full ? "px-3" : ""}`}
        onClick={stopPropagation}
      >
        <div className="flex h-screen items-center justify-center">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-xl duration-500 bg-foreground shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-500 data-[leave]:duration-300 data-[enter]:ease-out data-[leave]:ease-in ${
              full ? "w-full" : "w-[24rem]"
            } ${maxWidthClass} data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95`}
          >
            <div
              className={`bg-foreground duration-500 transition-all ${
                full ? "h-screen" : "h-fit"
              } sm:h-full`}
            >
              <div className="mt-7 sm:mt-2 w-full relative">
                <DialogTitle
                  as="h3"
                  className="text-base text-center border-b border-border font-bold leading-6 text-text pb-4"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2 pb-4 text-text">{children}</div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
