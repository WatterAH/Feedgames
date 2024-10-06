import { User } from "@/interfaces/User";
import { Bookmark, Heart, LogOut, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { share } from "@/functions/utils";

const useProfileOptions = (user: User, id: string) => {
  const [, , removeCookie] = useCookies();
  const router = useRouter();

  return [
    {
      label: "Compartir perfil",
      icon: Share,
      onClick: () => share("u", id),
    },
    user.id === id
      ? {
          label: "Riot Games",
          onClick: () => null,
        }
      : null,
    user.id === id
      ? {
          label: "Cerrar sesión",
          icon: LogOut,
          color: "text-red-400",
          onClick: () => {
            removeCookie("token");
            router.push("/login");
          },
        }
      : null,
  ].filter(Boolean);
};

const usePostOptions = (id: string) => {
  return [
    {
      label: "Compartir",
      icon: Share,
      onClick: () => share("p", id),
    },
  ].filter(Boolean);
};

const useMenuOptions = () => {
  const [, , removeCookie] = useCookies();
  const router = useRouter();

  return [
    {
      label: "Me gusta",
      icon: Heart,
      onClick: () => router.push("/liked"),
    },
    {
      label: "Guardado",
      icon: Bookmark,
      onClick: () => router.push("/saved"),
    },
    {
      label: "Cerrar Sesión",
      icon: LogOut,
      color: "text-red-400",
      onClick: () => {
        removeCookie("token");
        router.push("/login");
      },
    },
  ].filter(Boolean);
};

export { useProfileOptions, usePostOptions, useMenuOptions };
