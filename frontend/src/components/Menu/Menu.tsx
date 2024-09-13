import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import {
  BellAlertIcon as BellSolid,
  HomeIcon as HomeSolid,
  MagnifyingGlassIcon as GlassIcon,
  PlusIcon,
  UserIcon as UserSolid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeLine,
  BellAlertIcon as BellLine,
  UserIcon as UserLine,
} from "@heroicons/react/24/outline";

const Menu = () => {
  const location = useLocation();
  const path = location.pathname.toLocaleLowerCase();
  const { user } = useUser();

  const icons = {
    home: { solid: HomeSolid, line: HomeLine },
    search: { solid: GlassIcon, line: GlassIcon },
    create: { solid: PlusIcon, line: PlusIcon },
    notify: { solid: BellSolid, line: BellLine },
    profile: { solid: UserSolid, line: UserLine },
  };

  const getIcon = (
    screen: string,
    key: "home" | "search" | "create" | "notify" | "profile"
  ) => {
    return path === screen ? icons[key].solid : icons[key].line;
  };

  return (
    <main className="w-full lg:w-64 bottom-0 fixed border-t lg:border-r left-0 lg:top-0 px-3 z-20 py-1 lg:py-6 h-14 lg:h-full bg-white">
      <header className="mb-6 pl-3 hidden lg:block">
        <h1 className="text-4xl font-pacifico">Feedgames</h1>
      </header>
      <ul className="flex flex-row lg:flex-col justify-between gap-y-6">
        <MenuItem
          link="/"
          Icon={getIcon("/", "home")}
          text="Inicio"
          isActive={path === "/"}
        />
        <MenuItem
          link="/explore"
          Icon={getIcon("/explore", "search")}
          text="Explorar"
          isActive={path === "/explore"}
        />
        <MenuItem
          link="/create"
          Icon={getIcon("/create", "create")}
          text="Crear"
          isActive={path === "/create"}
        />
        <MenuItem
          link="/notify"
          Icon={getIcon("/notify", "notify")}
          text="Notificaciones"
          isActive={path === "/notify"}
        />
        <MenuItem
          link={`/u/${user.id}`}
          Icon={getIcon(`/u/${user.id}`, "profile")}
          text="Tú"
          isActive={path === `/u/${user.id}`}
        />
      </ul>
    </main>
  );
};

export default Menu;
