import copy from "clipboard-copy";
import { Option } from "../components/Global/Options";
import { User } from "../interfaces/User";
import { Flag, Share, Trash } from "lucide-react";

export const postOptions = (
  id_post: string,
  id_user: string,
  userSession: User,
  handleDelete: () => void
) => {
  const simpleClass = "h-2 w-2 ml-3";

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
      icon: <Share className={simpleClass} />,
      label: "Compartir",
      onClick: share,
    },
    id_user != userSession.id
      ? {
          icon: <Flag className={`${simpleClass} text-red-400`} />,
          label: "Reportar",
          onClick: () => {},
        }
      : null,
    id_user == userSession.id
      ? {
          icon: <Trash className={`${simpleClass} text-red-400`} />,
          label: "Eliminar",
          onClick: handleDelete,
        }
      : null,
  ];

  return options.filter((option) => option !== null) as any[];
};
