import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import FormField from "../Global/FormField";
import Button from "../Global/Button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import { isImage } from "@/functions/utils";
import { editProfile } from "@/routes/profile";
import { useCookies } from "react-cookie";
import { getExpirationDate } from "@/functions/date";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: React.FC<Props> = ({ open, setOpen }) => {
  const { user, login } = useUser();
  const src = user.pfp
    ? process.env.NEXT_PUBLIC_IMAGES + user.pfp
    : "/default.png";
  const [picture, setPicture] = useState(src);
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [details, setDetails] = useState(user.details);
  const [, setCookie] = useCookies();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    toast.promise(editProfile(user.id, name, username, details, image), {
      loading: "Cargando...",
      success: (data) => {
        const { user: userData, token } = data;
        login(userData);
        setCookie("token", token, {
          path: "/",
          expires: getExpirationDate(),
          secure: true,
          sameSite: "none",
        });
        return "Recarga para ver los cambios";
      },
      error: (error) => {
        return error.message;
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!isImage(file)) return toast.warning("Solo se permiten imágenes");

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-black/15 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
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
                    Modo de edición
                  </DialogTitle>
                  <div className="mt-2">
                    <div
                      className="absolute rounded-full hover:bg-gray-100 right-2 top-2 hover:cursor-pointer p-2 transition-all duration-500"
                      onClick={() => setOpen(false)}
                    >
                      <X className="text-threads" />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="w-full flex flex-col items-center gap-y-2 mt-4">
                        <Image
                          src={picture}
                          className="rounded-full"
                          alt=""
                          width={80}
                          height={80}
                        />
                        <label
                          htmlFor="img"
                          className="text-threads hover:cursor-pointer"
                        >
                          Cambiar foto
                        </label>
                        <input
                          id="img"
                          onChange={handleImageChange}
                          type="file"
                          accept=".png, .jpeg, .jpg, .gif, .webp"
                          className="hidden"
                        />
                      </div>
                      <FormField
                        label="Usuario"
                        value={username}
                        onChange={setUsername}
                      />
                      <FormField
                        label="Nombre"
                        value={name}
                        onChange={setName}
                      />
                      <FormField
                        label="Descripción"
                        value={details}
                        onChange={setDetails}
                      />
                      <div className="flex items-center justify-center relative mt-6">
                        <Button>Listo</Button>
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

export default Edit;
