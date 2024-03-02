import React from "react";
import {
  ArrowUpOnSquareIcon,
  FlagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { User } from "../../interfaces/User";
import copy from "clipboard-copy";

export const commentOptions = (
  id_user: string,
  id_comment: string,
  user: User,
  handleDelete: () => void
) => {
  const singleClassName = "h-4 md:h-5 mr-2";

  const share = () => {
    if (navigator.share) {
      navigator.share({
        url: `https://feedgames.vercel.app/c/${id_comment}`,
      });
    } else {
      copy(`https://feedgames.vercel.app/c/${id_comment}`);
    }
  };

  const options = [
    {
      icon: <ArrowUpOnSquareIcon className={singleClassName} />,
      label: "Compartir",
      onClick: share,
    },
    id_user == user.id
      ? {
          icon: <TrashIcon className={`${singleClassName} text-red-400`} />,
          label: "Eliminar",
          onClick: handleDelete,
        }
      : null,
    id_user != user.id
      ? {
          icon: <FlagIcon className={`${singleClassName} text-red-400`} />,
          label: "Reportar",
          onClick: () => {},
        }
      : null,
  ];

  return options.filter((option) => option !== null) as any[];
};
