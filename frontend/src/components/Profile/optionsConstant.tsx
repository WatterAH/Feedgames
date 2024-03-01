import React from "react";
import { User } from "../../interfaces/User";
import {
  ArrowUpOnSquareIcon,
  FlagIcon,
  PencilSquareIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { logoutApi } from "../../Api/auth";
import { useNavigate } from "react-router-dom";

export const profileOptions = (
  userSession: User,
  id: string,
  openModal: () => void
) => {
  const nav = useNavigate();
  const logout = () => {
    logoutApi().then(() => nav("/auth"));
  };
  const singleClassName = "h-4 md:h-5 mr-2";

  const options = [
    {
      icon: <ArrowUpOnSquareIcon className={singleClassName} />,
      label: "Compartir",
      onClick: () => {},
    },
    userSession.id !== id
      ? {
          icon: <FlagIcon className={`${singleClassName} text-red-400`} />,
          label: "Reportar",
          onClick: () => {},
        }
      : null,
    userSession.id === id
      ? {
          icon: <PencilSquareIcon className={singleClassName} />,
          label: "Editar perfil",
          onClick: openModal,
        }
      : null,
    userSession.id === id
      ? {
          icon: (
            <ArrowLeftStartOnRectangleIcon
              className={`${singleClassName} text-red-400`}
            />
          ),
          label: "Cerrar sesión",
          onClick: logout,
        }
      : null,
  ];

  return options.filter((option) => option !== null) as any[];
};
