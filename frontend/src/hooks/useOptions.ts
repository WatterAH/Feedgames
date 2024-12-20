import React from "react";
import { User } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { share } from "@/functions/utils";
import { useUser } from "@/context/AuthContext";
import {
  Bookmark,
  Gamepad2,
  Heart,
  LogOut,
  Pencil,
  Share,
  Trash2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { removePost } from "@/store/feedSlice";
import { removeNotify } from "@/store/activity";
import { resetAll } from "@/store/actions";

export const useProfileOptions = (
  user: User,
  id: string,
  logout: () => void
) => {
  const dispatch: AppDispatch = useDispatch();
  const [_c, _s, removeCookie] = useCookies();
  const router = useRouter();
  const RSO = process.env.NEXT_PUBLIC_RSO_AUTH;
  const exit = () => {
    router.push("/login");
    removeCookie("token");
    logout();
    dispatch(resetAll());
  };

  return [
    {
      label: "Compartir perfil",
      icon: Share,
      onClick: () => share("u", id),
    },
    user.id === id
      ? {
          label: "Riot Games",
          onClick: () => {
            router.push(RSO ?? "");
          },
          icon: Gamepad2,
        }
      : null,
    user.id === id
      ? {
          label: "Cerrar sesión",
          icon: LogOut,
          onClick: exit,
        }
      : null,
  ].filter(Boolean);
};

export const usePostOptions = (
  id: string,
  userId: string,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();

  return [
    {
      label: "Compartir",
      icon: Share,
      onClick: () => share("p", id),
    },

    user.id === userId
      ? {
          label: "Editar",
          icon: Pencil,
          onClick: () => setEditing(true),
        }
      : null,
    user.id === userId
      ? {
          label: "Eliminar",
          icon: Trash2,
          onClick: () => dispatch(removePost(id)),
        }
      : null,
  ].filter(Boolean);
};

export const useMenuOptions = (logout: () => void) => {
  const dispatch: AppDispatch = useDispatch();
  const [_c, _s, removeCookie] = useCookies();
  const router = useRouter();
  const exit = () => {
    router.push("/login");
    removeCookie("token");
    logout();
    dispatch(resetAll());
  };

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
      onClick: exit,
    },
  ].filter(Boolean);
};

export const useNotifyOptions = (id: string) => {
  const dispatch: AppDispatch = useDispatch();

  return [
    {
      label: "Eliminar",
      icon: Trash2,
      onClick: () => dispatch(removeNotify(id)),
    },
  ].filter(Boolean);
};
