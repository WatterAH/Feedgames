import React, { useEffect, useState } from "react";
import Preview from "./Preview";
import TextArea from "./TextArea";
import ImageInput from "./contents/ImageInput";
import MatchInput from "./contents/MatchInput";
import ProfilePicture from "@/components/Profile/ProfilePicture";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import { createPost } from "@/routes/post";
import { MatchShowCase } from "@/interfaces/Valorant";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useGetMatches } from "@/hooks/useValorant";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Create: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useUser();
  const { matches } = useGetMatches(user.riotId.puuid);
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
        return "Publicado";
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-black/15 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in overflow-y-scroll"
      />

      <div className="fixed inset-0 z-10">
        <div className="flex items-center justify-center border h-screen text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden md:rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full md:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white pt-5 h-screen md:h-full relative">
              <div className="flex flex-col">
                <div className="mt-3 sm:mt-0 sm:text-left w-full">
                  <div
                    id="title"
                    className="flex justify-between px-2 text-threads"
                  >
                    <button
                      className="rounded-full hover:bg-gray-100 hover:cursor-pointer p-2 transition-all duration-500"
                      onClick={() => setOpen(false)}
                    >
                      <X />
                    </button>
                    <h3 className="font-semibold">Nuevo Post</h3>
                    <button
                      className="rounded-full hover:bg-gray-100 hover:cursor-pointer p-2 transition-all duration-500"
                      onClick={handleSubmit}
                    >
                      <Check />
                    </button>
                  </div>
                  <div className="mt-10 md:mt-5 flex flex-col gap-x-2 px-4 md:pb-4">
                    <div className="flex items-center gap-x-2">
                      <ProfilePicture src={user.pfp} w={40} h={40} />
                      <div className="mb-2">
                        <p className="font-semibold">{user.username}</p>
                      </div>
                    </div>
                    <form className="w-full mt-3 overflow-y-auto scrollbar-thin h-96 md:h-64">
                      <TextArea text={text} setText={setText} />
                      <div className="">
                        <Preview preview={preview} setPreview={setPreview} />
                      </div>
                      <div className="flex gap-x-2">
                        <ImageInput
                          setImage={setImage}
                          setPreview={setPreview}
                        />
                        {user.riotId && (
                          <MatchInput
                            matches={matches}
                            setValMatch={setValMatch}
                            setPreview={setPreview}
                          />
                        )}
                      </div>
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

export default Create;
