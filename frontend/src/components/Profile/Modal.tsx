import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "../Input";
import { Label } from "../Label";
import { Button } from "../Button";
import { Loading } from "../Loading";
import { toast } from "react-toastify";
import { useUser } from "../../Context/AuthContext";
import { editProfile } from "../../api/profile";
import { isImage } from "../../functions/validator";
import default_pfp from "../../assets/img/default.png";
import { User } from "../../interfaces/User";
import { getExpirationDate } from "../../functions/date";
import { useCookies } from "react-cookie";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  userData: User;
}

export const Modal: React.FC<Props> = ({ closeModal, isOpen, userData }) => {
  const { user, login } = useUser();
  const [loading, setLoading] = useState(false);
  const src = userData.pfp
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${userData.pfp}`
    : default_pfp;
  const [pfp, setPfp] = useState(src);
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState(userData.username);
  const [name, setName] = useState(userData.name);
  const [details, setDetails] = useState(userData.details);
  const [_cookies, setCookie] = useCookies();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await editProfile(user.id, name, username, details, image);
      const { user: userData, token } = data;
      login(userData);
      setCookie("token", token, {
        path: "/",
        expires: getExpirationDate(),
        secure: true,
        sameSite: "none",
      });
      window.location.reload();
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (!isImage(file)) {
      return toast.error("Solo se permiten imágenes", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPfp(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }
    return;
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:border dark:bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Modo de Edición
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-4 flex items-center gap-x-3">
                      <img
                        src={pfp}
                        alt="pfp"
                        className="rounded-full w-14 h-14"
                      />
                      <label
                        htmlFor="Image"
                        className="hover:cursor-pointer text-blue-600"
                      >
                        Cambiar foto
                      </label>
                      <input
                        id="Image"
                        onChange={handleImage}
                        type="file"
                        accept="image/png, .jpeg, .jpg, image/gif"
                        className="hidden"
                      />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="username">Nombre de usuario</Label>
                      <Input
                        id="username"
                        placeholder="Nombre de usuario"
                        value={username}
                        maxLength={16}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        placeholder="Nombre"
                        value={name}
                        maxLength={17}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="details">Descripción</Label>
                      <Input
                        id="details"
                        placeholder="Descripción"
                        value={details}
                        maxLength={50}
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 flex justify-center relative">
                      <Button
                        type="submit"
                        disabled={!username || !name ? true : false}
                      >
                        {loading ? "" : "Listo"}
                      </Button>
                      {loading ? <Loading /> : null}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
