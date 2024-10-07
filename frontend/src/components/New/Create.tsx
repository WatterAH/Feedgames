import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "../Global/Button";
import Preview from "./Preview";
import TextArea from "./TextArea";
import ImageInput from "./contents/ImageInput";
import ProfilePicture from "../Profile/ProfilePicture";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import { createPost } from "@/routes/post";
import { MatchShowCase } from "@/interfaces/Valorant";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Create: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useUser();
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [valMatch, setValMatch] = useState<MatchShowCase | null>(null);
  const [preview, setPreview] = useState<
    string | ArrayBuffer | MatchShowCase | null
  >(null);

  useEffect(() => {
    if (preview == null) {
      setImage(null);
      setValMatch(null);
    }
  }, [preview]);

  useEffect(() => {
    if (image) {
      setValMatch(null);
    }
  }, [image]);

  useEffect(() => {
    if (valMatch) {
      setImage(null);
    }
  }, [valMatch]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    toast.promise(createPost(user.id, text, image, valMatch), {
      loading: "Subiendo...",
      success: () => {
        setText("");
        setImage(null);
        setValMatch(null);
        setPreview(null);
        return "Hecho!";
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur bg-black/20 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10">
        <div className="flex items-center justify-center border h-screen text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden md:rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full md:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white pt-5 h-screen md:h-full relative">
              <div className="sm:flex sm:items-end flex-col">
                <div className="mt-3 sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 text-center"
                  >
                    Nuevo Post
                  </DialogTitle>
                  <div
                    className="absolute rounded-full hover:bg-gray-100 right-2 top-2 hover:cursor-pointer p-2 transition-all duration-500"
                    onClick={() => setOpen(false)}
                  >
                    <X className="text-threads" />
                  </div>
                  <div className="mt-2 flex flex-col gap-x-2 px-4">
                    <div className="flex items-center gap-x-2">
                      <ProfilePicture src={user.pfp} w={40} h={40} />
                      <div className="mb-2">
                        <p className="font-semibold">{user.username}</p>
                      </div>
                    </div>
                    <form className="w-full mt-3 overflow-y-auto scrollbar-thin h-96 md:h-64 pb-2">
                      <TextArea text={text} setText={setText} />
                      <div className="">
                        <Preview preview={preview} setPreview={setPreview} />
                      </div>
                      <div className="flex">
                        <ImageInput
                          setImage={setImage}
                          setPreview={setPreview}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full backdrop-blur-md px-4 py-2 bg-barcelona bg-opacity-90 rounded-b-md">
                  <p className="text-xs text-secondaryicon font-raleway">
                    Cualquiera en{" "}
                    <span className="font-pacifico">Feedgames</span> puede ver
                    esto.
                  </p>
                  <div className="w-20">
                    <Button onClick={handleSubmit}>Publicar</Button>
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

export default Create;
