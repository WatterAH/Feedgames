import { defaultUser, User } from "@/interfaces/User";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { share } from "@/functions/utils";
import { useUser } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { removePost } from "@/store/feedSlice";
import { removeNotify } from "@/store/activity";
import {
  Bookmark,
  Gamepad2,
  Heart,
  LogIn,
  LogOut,
  LucideIcon,
  Palette,
  Pencil,
  Share,
  Trash2,
} from "lucide-react";

const useExitHandler = (logout: () => void) => {
  const router = useRouter();
  const [_c, _s, removeCookie] = useCookies();

  return () => {
    router.push("/login");
    removeCookie("token");
    logout();
  };
};

// Hook genérico para construir opciones
const useOptions = (
  options: Array<{
    show: boolean;
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  }>
) =>
  options
    .filter(({ show }) => show)
    .map(({ label, icon, onClick }) => ({ label, icon, onClick }));

// Opciones de perfil
export const useProfileOptions = (
  user: User,
  id: string,
  setOpen: (value: boolean) => void,
  logout: () => void
) => {
  const exit = useExitHandler(logout);
  const router = useRouter();
  const RSO = process.env.NEXT_PUBLIC_RSO_AUTH;

  return useOptions([
    {
      show: true,
      label: "Compartir perfil",
      icon: Share,
      onClick: () => share("u", id),
    },
    {
      show: user.id === id,
      label: "Elegir un tema",
      icon: Palette,
      onClick: () => setOpen(true),
    },
    {
      show: user.id === id,
      label: "Riot Games",
      icon: Gamepad2,
      onClick: () => router.push(RSO ?? ""),
    },
    {
      show: user.id === id,
      label: "Cerrar sesión",
      icon: LogOut,
      onClick: exit,
    },
  ]);
};

// Opciones de post
export const usePostOptions = (
  id: string,
  userId: string,
  setEditing: (value: boolean) => void
) => {
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();

  return useOptions([
    {
      show: true,
      label: "Compartir",
      icon: Share,
      onClick: () => share("p", id),
    },
    {
      show: user.id === userId,
      label: "Editar",
      icon: Pencil,
      onClick: () => setEditing(true),
    },
    {
      show: user.id === userId,
      label: "Eliminar",
      icon: Trash2,
      onClick: () => dispatch(removePost(id)),
    },
  ]);
};

// Opciones del menú
export const useMenuOptions = (
  logout: () => void,
  setOpen: (value: boolean) => void
) => {
  const { user } = useUser();
  const exit = useExitHandler(logout);
  const router = useRouter();
  const activeSession = user.id !== defaultUser.id;

  return useOptions([
    {
      show: activeSession,
      label: "Me gusta",
      icon: Heart,
      onClick: () => router.push("/liked"),
    },
    {
      show: activeSession,
      label: "Guardado",
      icon: Bookmark,
      onClick: () => router.push("/saved"),
    },
    {
      show: true,
      label: "Apariencia",
      icon: Palette,
      onClick: () => setOpen(true),
    },
    {
      show: true,
      label: activeSession ? "Cerrar Sesión" : "Iniciar Sesión",
      icon: activeSession ? LogOut : LogIn,
      onClick: exit,
    },
  ]);
};

// Opciones de notificación
export const useNotifyOptions = (id: string) => {
  const dispatch: AppDispatch = useDispatch();

  return useOptions([
    {
      show: true,
      label: "Eliminar",
      icon: Trash2,
      onClick: () => dispatch(removeNotify(id)),
    },
  ]);
};
