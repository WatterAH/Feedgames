import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../Api/auth";
import { toast } from "react-toastify";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { updateImage, uploadPfp } from "../../Api/profile";
import { useUser } from "../../context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Options = ({ openModal }) => {
  const nav = useNavigate();
  const { user } = useUser();
  const extensionList = ["jpg", "jpeg", "gif", "png", "webp"];

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let extension = file.name.split(".").pop().toLowerCase();
    const isImage = extensionList.indexOf(extension) == -1 ? false : true;
    if (!isImage) {
      return toast.error("Solo se permiten imágenes", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const { data, error } = await uploadPfp(file);
    if (error) {
      return toast.error("No se pudo subir la imagen", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    await updateImage(data, user.id);
    window.location.reload();
  };

  const logout = async () => {
    try {
      await logoutApi();
      nav("/auth");
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5">
          <FontAwesomeIcon icon={faGear} className="h-6 text-gray-700" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <>
                  <label
                    className={classNames(
                      active ? "bg-gray-100 text-gray-600" : "text-gray-600",
                      "block px-4 py-2 text-sm hover:cursor-pointer"
                    )}
                    htmlFor="pfp"
                  >
                    <FontAwesomeIcon
                      icon={faImage}
                      className="mr-2 text-cyan-400"
                    />
                    Cambiar foto de perfil
                  </label>
                  <input
                    onChange={handleImage}
                    className="hidden"
                    type="file"
                    accept="image/png, .jpeg, .jpg, image/gif"
                    id="pfp"
                  />
                </>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-600" : "text-gray-600",
                    "block px-4 py-2 text-sm hover:cursor-pointer"
                  )}
                  onClick={openModal}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="mr-2 text-teal-800"
                  />
                  Editar perfil
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm hover:cursor-pointer"
                  )}
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="mr-2 text-red-500"
                  />
                  Cerrar sesión
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
