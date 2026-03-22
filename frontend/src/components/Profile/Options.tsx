import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { share } from "@/lib/utils";
import { toast } from "sonner";
import { BProgress } from "@bprogress/core";
import { useUser } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { getExpirationDate } from "@/lib/date";
import { LogOut, Share, UserRoundCog } from "lucide-react";
import Link from "next/link";
import valRouter from "@/routes/valorant";

interface Props {
  userId: string;
}

const Options: React.FC<Props> = ({ userId }) => {
  const { user, login, logout } = useUser();
  const router = useRouter();
  const sameUser = user.id === userId;
  const [_c, setCookie, removeCookie] = useCookies();

  function exitHadler() {
    removeCookie("token");
    logout();
    router.push("/login");
  }

  async function unlink() {
    try {
      BProgress.start();
      const data = await valRouter.unlink(user.id);

      login(data.user);
      setCookie("token", data.token, {
        expires: getExpirationDate(),
      });

      toast.success("Cuenta desvinculada");
      BProgress.done();
    } catch (error) {
      toast.error("Error al desvincular la cuenta");
    }
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
            {user.riotId ? (
              <DropdownMenuItem onClick={unlink}>
                Desvincular cuenta
                <Image
                  src="/riot.webp"
                  alt="riot-games"
                  width={20}
                  height={20}
                />
              </DropdownMenuItem>
            ) : (
              <Link href={`https://craftfeed.fly.dev/val/auth/${user.id}`}>
                <DropdownMenuItem>
                  Riot Games
                  <Image
                    src="/riot.webp"
                    alt="riot-games"
                    width={20}
                    height={20}
                  />
                </DropdownMenuItem>
              </Link>
            )}
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
