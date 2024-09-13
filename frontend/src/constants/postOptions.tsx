import copy from "clipboard-copy";
import {
  ArrowUpOnSquareIcon,
  FlagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Option } from "../components/Global/Options";
import { User } from "../interfaces/User";

export const postOptions = (
  id_post: string,
  id_user: string,
  userSession: User,
  handleDelete: () => void
) => {
  const simpleClass = "h-4 md:h-5 mr-2";

  const share = () => {
    if (navigator.share) {
      navigator.share({
        url: `https://feedgames.vercel.app/p/${id_post}`,
      });
    } else {
      copy(`https://feedgames.vercel.app/p/${id_post}`);
    }
  };

  const options: (Option | null)[] = [
    {
      icon: <ArrowUpOnSquareIcon className={simpleClass} />,
      label: "Compartir",
      onClick: share,
    },
    id_user != userSession.id
      ? {
          icon: <FlagIcon className={`${simpleClass} text-red-400`} />,
          label: "Reportar",
          onClick: () => {},
        }
      : null,
    id_user == userSession.id
      ? {
          icon: <TrashIcon className={`${simpleClass} text-red-500`} />,
          label: "Eliminar",
          onClick: handleDelete,
        }
      : null,
  ];

  return options.filter((option) => option !== null) as any[];
};
