import { User } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { share } from "@/functions/utils";
import { useUser } from "@/context/AuthContext";
import { Bookmark, Gamepad2, Heart, LogOut, Share, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { removePost, resetFeedPosts } from "@/store/feedSlice";
import { removeNotify, resetNotifications } from "@/store/activity";
import { resetUser } from "@/store/userSlice";
import { resetTendency } from "@/store/tendencySlice";

const useProfileOptions = (user: User, id: string, logout: () => void) => {
  const dispatch: AppDispatch = useDispatch();
  const [, , removeCookie] = useCookies();
  const router = useRouter();
  const RSO =
    "https://auth.riotgames.com/authorize?redirect_uri=https://craftfeed.fly.dev/oauth2-callback&client_id=904e7558-66be-4c49-b89d-1020aad6da43&response_type=code&scope=openid";
  const exit = () => {
    router.push("/login");
    removeCookie("token");
    logout();
    dispatch(resetNotifications());
    dispatch(resetFeedPosts());
    dispatch(resetUser());
    dispatch(resetTendency());
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
            router.push(RSO);
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
          onClick: () => dispatch(removePost(id)),
        }
      : null,
  ].filter(Boolean);
};

const useMenuOptions = (logout: () => void) => {
  const dispatch: AppDispatch = useDispatch();
  const [, , removeCookie] = useCookies();
  const router = useRouter();
  const exit = () => {
    router.push("/login");
    removeCookie("token");
    logout();
    dispatch(resetNotifications());
    dispatch(resetFeedPosts());
    dispatch(resetUser());
    dispatch(resetTendency());
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

const useNotifyOptions = (id: string) => {
  const dispatch: AppDispatch = useDispatch();

  return [
    {
      label: "Eliminar",
      icon: Trash2,
      onClick: () => dispatch(removeNotify(id)),
    },
  ].filter(Boolean);
};

export { useProfileOptions, usePostOptions, useMenuOptions, useNotifyOptions };
