import React, { useState } from "react";
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
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-black/15 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10">
        <div className="flex h-screen items-center justify-center text-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden sm:rounded-lg bg-white  shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white sm:p-4 h-screen sm:h-full">
              <div className="sm:flex sm:items-start">
                <div className="mt-7 sm:mt-0 w-full relative">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Modo de Edición
                  </DialogTitle>
                  <div className="mt-4 px-4 sm:px-0">
                    <div
                      className="absolute rounded-full hover:bg-gray-100 right-2 -top-2 hover:cursor-pointer p-2 transition-all duration-500"
                      onClick={() => setOpen(false)}
                    >
                      <X className="text-threads" />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="w-full flex flex-col items-center gap-y-2 mt-4">
                        <div
                          className="rounded-full h-20 w-20 bg-loading"
                          style={{
                            width: "80px",
                            height: "80px",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={picture}
                            alt=""
                            fill
                            priority
                            className="object-cover cursor-pointer rounded-full"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
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
