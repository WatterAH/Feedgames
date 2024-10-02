import copy from "clipboard-copy";
import { useCookies } from "react-cookie";
import { User } from "@/interfaces/User";
import { Option } from "@/components/Global/Options";
import { useRouter } from "next/navigation";
import { Flag, LogOut, Pencil, Share } from "lucide-react";

export const ProfileOptions = (userSession: User, id: string) => {
  const router = useRouter();
  const simpleClass = "h-2 w-2";
  const [, , removeCookie] = useCookies();

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
    router.push("/login");
  };

  const options: (Option | null)[] = [
    {
      icon: <Share className={simpleClass} />,
      label: "Compartir",
      onClick: share,
    },
    userSession.id !== id
      ? {
          icon: <Flag className={`${simpleClass} text-red-400`} />,
          label: "Reportar",
          onClick: () => {},
        }
      : null,
    userSession.id === id
      ? {
          icon: <Pencil className={simpleClass} />,
          label: "Editar perfil",
          onClick: () => {},
        }
      : null,
    userSession.id === id
      ? {
          icon: <img src="/riotgames.svg" alt="riot" className="h-6 w-6" />,
          label: "Riot Games",
          href: "https://auth.riotgames.com/authorize?redirect_uri=https://craftfeed.fly.dev/oauth2-callback&client_id=904e7558-66be-4c49-b89d-1020aad6da43&response_type=code&scope=openid",
          onClick: () => {},
        }
      : null,
    userSession.id === id
      ? {
          icon: <LogOut className={`${simpleClass} text-red-400`} />,
          label: "Cerrar sesión",
          onClick: logout,
        }
      : null,
  ];

  return options.filter((option) => option !== null) as any[];
};
