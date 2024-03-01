import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../Api/auth";
import { toast } from "react-toastify";
// import riotgames from "../../assets/img/riotgames.svg";
import {
  CogIcon,
  PencilSquareIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Modal } from "../Modal";

interface Props {
  openModal: () => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Options: React.FC<Props> = ({ openModal }) => {
  const nav = useNavigate();

  const logout = async () => {
    try {
      await logoutApi();
      nav("/auth");
    } catch (error: any) {
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
          <CogIcon aria-hidden="true" className="h-7 text-gray-700 mt-2" />
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
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-600" : "text-gray-600",
                    "px-4 py-2 text-sm hover:cursor-pointer flex items-center"
                  )}
                  href="https://auth.riotgames.com/authorize?redirect_uri=https://craftfeed.fly.dev/oauth2-callback&client_id=904e7558-66be-4c49-b89d-1020aad6da43&response_type=code&scope=openid"
                >
                  <img
                    src={riotgames}
                    alt="riot"
                    className="h-5 w-5 -ml-1 mr-2"
                  />
                  Riot Games
                </a>
              )}
            </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center px-4 py-2 text-sm hover:cursor-pointer"
                  )}
                  onClick={logout}
                >
                  <ArrowLeftStartOnRectangleIcon
                    aria-hidden="true"
                    className="text-red-400 h-5 mr-2 -ml-1"
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
