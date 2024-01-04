import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Input } from "../Input";
import { Label } from "../Label";
import { Button } from "../Button";
import { Loading } from "../Loading";
import { toast } from "react-toastify";
import { useUser } from "../../context/AuthContext";
import { editProfile } from "../../Api/profile";
import { displayContent } from "../../home/Home";

export const Modal = ({ data }) => {
  const { user, login } = useUser();
  const { closeModal, isOpen, userData } = data;
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(userData.username);
  const [name, setName] = useState(userData.name);
  const [details, setDetails] = useState(userData.details);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await editProfile(
        user.id,
        name,
        username,
        user.username,
        details
      );
      login(data);
      displayContent("void");
      window.location.reload();
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Modo de Edición
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                      <Label htmlFor="username">Nombre de usuario</Label>
                      <Input
                        id="username"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="details">Descripción</Label>
                      <Input
                        id="details"
                        placeholder="Descripción"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 flex justify-center relative">
                      <Button type="submit" disabled={loading}>
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
