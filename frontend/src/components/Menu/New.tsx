import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "../Global/Button";
import ProfilePicture from "../Profile/ProfilePicture";
import { useUser } from "@/context/AuthContext";
import { Image as ImageIcon } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const New: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

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
                  <div className="mt-2 flex flex-col gap-x-2">
                    <div className="flex items-center gap-x-2">
                      <ProfilePicture src={user.pfp} w={40} h={40} />
                      <div className="mb-2">
                        <p className="font-semibold">{user.username}</p>
                      </div>
                    </div>
                    <form className="w-full mt-3">
                      <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleInput}
                        placeholder="¿Qué hay en tu mente?"
                        className="font-montserrat outline-none w-full resize-none sm:text-xs h-auto scrollbar-thin"
                        rows={1}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      />
                      <div className="mt-3 flex">
                        <ImageIcon className="text-secondaryicon h-5" />
                      </div>
                    </form>
                    <div className="mt-5 w-full">
                      <Button>Publicar</Button>
                    </div>
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
