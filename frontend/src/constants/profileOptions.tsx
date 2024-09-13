import {
  ArrowUpOnSquareIcon,
  FlagIcon,
  PencilSquareIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import riotgames from "../assets/riotgames.svg";
import copy from "clipboard-copy";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { User } from "../interfaces/User";
import { Option } from "../components/Global/Options";

export const profileOptions = (userSession: User, id: string) => {
  const nav = useNavigate();
  const simpleClass = "h-4 md:h-5 mr-2";
  const [_cookies, _setCookies, removeCookie] = useCookies();

  const share = () => {
    if (navigator.share) {
      navigator.share({
        url: `https://feedgames.vercel.app/u/${id}`,
      });
    } else {
      copy(`https://feedgames.vercel.app/u/${id}`);
    }
  };

  const logout = () => {
    removeCookie("token");
    nav("/auth");
  };

  const options: (Option | null)[] = [
    {
      icon: <ArrowUpOnSquareIcon className={simpleClass} />,
      label: "Compartir",
      onClick: share,
    },
    userSession.id !== id
      ? {
          icon: <FlagIcon className={`${simpleClass} text-red-400`} />,
          label: "Reportar",
          onClick: () => {},
        }
      : null,
    userSession.id === id
      ? {
          icon: <PencilSquareIcon className={simpleClass} />,
          label: "Editar perfil",
          onClick: () => {},
        }
      : null,
    userSession.id === id
      ? {
          icon: <img src={riotgames} className={simpleClass} />,
          label: "Riot Games",
          href: "https://auth.riotgames.com/authorize?redirect_uri=https://craftfeed.fly.dev/oauth2-callback&client_id=904e7558-66be-4c49-b89d-1020aad6da43&response_type=code&scope=openid",
          onClick: () => {},
        }
      : null,
    userSession.id === id
      ? {
          icon: (
            <ArrowLeftStartOnRectangleIcon
              className={`${simpleClass} text-red-400`}
            />
          ),
          label: "Cerrar sesión",
          onClick: logout,
        }
      : null,
  ];

  return options.filter((option) => option !== null) as any[];
};
