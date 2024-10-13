import React from "react";
import { User } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { share } from "@/functions/utils";
import { useUser } from "@/context/AuthContext";
import { toast } from "sonner";
import { Bookmark, Gamepad2, Heart, LogOut, Share, Trash2 } from "lucide-react";
import { deleteNotificationById } from "@/routes/notifications";
import { Notification } from "@/interfaces/Notification";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { removePost, resetPosts } from "@/store/feedSlice";

const useProfileOptions = (user: User, id: string) => {
  const dispatch: AppDispatch = useDispatch();
  const [, , removeCookie] = useCookies();
  const router = useRouter();
  const RSO =
    "https://auth.riotgames.com/authorize?redirect_uri=https://craftfeed.fly.dev/oauth2-callback&client_id=904e7558-66be-4c49-b89d-1020aad6da43&response_type=code&scope=openid";

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
            router.push(RSO);
          },
          icon: Gamepad2,
        }
      : null,
    user.id === id
      ? {
          label: "Cerrar sesión",
          icon: LogOut,
          color: "text-red-400",
          onClick: () => {
            dispatch(resetPosts());
            removeCookie("token");
            router.push("/login");
          },
        }
      : null,
  ].filter(Boolean);
};

const usePostOptions = (id: string, userId: string) => {
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
          label: "Eliminar",
          icon: Trash2,
          color: "text-red-400",
          onClick: () => dispatch(removePost(id)),
        }
      : null,
  ].filter(Boolean);
};

const useMenuOptions = () => {
  const dispatch: AppDispatch = useDispatch();
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
        dispatch(resetPosts());
        removeCookie("token");
        router.push("/login");
      },
    },
  ].filter(Boolean);
};

const useNotifyOptions = (
  id: string,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) => {
  const deleteNotify = () => {
    toast.promise(deleteNotificationById(id), {
      loading: "Eliminando...",
      success: () => {
        setNotifications((prev) => prev.filter((notify) => notify.id != id));
        return "Eliminado";
      },
      error: (err) => err.message,
    });
  };

  return [
    {
      label: "Eliminar",
      icon: Trash2,
      color: "text-red-400",
      onClick: () => deleteNotify(),
    },
  ].filter(Boolean);
};

export { useProfileOptions, usePostOptions, useMenuOptions, useNotifyOptions };
