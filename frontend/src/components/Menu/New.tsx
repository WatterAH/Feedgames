import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const New: React.FC<Props> = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      // Resetea la altura para recalcular en base al contenido actual
      textareaRef.current.style.height = "auto";
      // Ajusta la altura en función del scrollHeight
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200 // Altura máxima en píxeles, ajustable según lo que necesites
      )}px`;
    }
  };

  // Ajustar la altura cuando el componente se monta o cambia el contenido
  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur bg-black/20 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:pb-5 relative">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 text-center"
                  >
                    Nuevo Post
                  </DialogTitle>
                  <div className="mt-2">
                    <form action="">
                      <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleInput}
                        placeholder="¿Qué hay en tu mente?"
                        className="font-montserrat outline-none w-full resize-none sm:text-xs h-auto scrollbar-thin"
                        rows={1}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default New;
