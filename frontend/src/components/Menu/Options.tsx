import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlignLeft,
  Bookmark,
  Heart,
  LogIn,
  LogOut,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

interface Props {
  appearanceCallback(): void;
}

const Options: React.FC<Props> = ({ appearanceCallback }) => {
  const { user, logout } = useUser();
  const isLoggedIn = user.id !== defaultUser.id;
  const router = useRouter();
  const [_c, _s, removeCookie] = useCookies();

  function exitHadler() {
    removeCookie("token");
    logout();
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex w-full justify-center gap-x-1.5 rounded-full p-2 text-threads hover:bg-(--hover) transition-all duration-300 cursor-pointer active:scale-90 focus:outline-hidden focus:ring-0 focus-visible:outline-none">
        <AlignLeft size={32} className="text-(--placeholder)" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {isLoggedIn && (
            <Link href="/liked">
              <DropdownMenuItem>
                Me gusta
                <Heart />
              </DropdownMenuItem>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/saved">
              <DropdownMenuItem>
                Guardado
                <Bookmark />
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        {isLoggedIn && <DropdownMenuSeparator />}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={appearanceCallback}>
            Apariencia
            <Palette />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={exitHadler}
            className={cn(isLoggedIn && "text-red-400")}
          >
            {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
            {isLoggedIn ? <LogOut /> : <LogIn />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
