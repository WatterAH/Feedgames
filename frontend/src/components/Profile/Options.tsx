import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Share, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useUser } from "@/context/AuthContext";
import { share } from "@/lib/utils";
import Image from "next/image";

interface Props {
  userId: string;
}

const Options: React.FC<Props> = ({ userId }) => {
  const { user, logout } = useUser();
  const router = useRouter();
  const sameUser = user.id === userId;
  const [_c, _s, removeCookie] = useCookies();

  function exitHadler() {
    removeCookie("token");
    logout();
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex w-full justify-center gap-x-1.5 rounded-full p-2 text-threads hover:bg-(--hover) transition-all duration-300 cursor-pointer active:scale-90 focus:outline-hidden focus:ring-0 focus-visible:outline-none">
        <UserRoundCog size={24} className="text-(--text)" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => share("u", userId)}>
            Compartir perfil
            <Share />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {sameUser && (
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Riot Games
              <Image src="/riot.webp" alt="riot-games" width={20} height={20} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {sameUser && (
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={exitHadler} className="text-red-400">
              Cerrar sesión
              <LogOut />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
