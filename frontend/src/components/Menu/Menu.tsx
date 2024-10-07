import Item from "./Item";
import { useUser } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import {
  AlignLeft,
  BellRing,
  House,
  Search,
  Send,
  SquarePen,
  User,
} from "lucide-react";
import Dropdown from "../Global/Dropdown";
import { useMenuOptions } from "@/hooks/useOptions";
import { useState } from "react";
import Create from "../New/Create";

const Menu = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const options = useMenuOptions();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full lg:w-20 bottom-0 fixed left-0 lg:top-0 px-3 z-20 h-14 lg:h-full bg-barcelona backdrop-blur-md bg-opacity-80 flex flex-col justify-center lg:items-center">
        <h1 className="font-pacifico text-3xl text-threads text-center hidden lg:block">
          Fg
        </h1>
        <ul className="flex flex-row justify-between lg:flex-col items-center lg:py-16 gap-y-5">
          <Item href="/home" currentPathname={pathname} Icon={House} />
          <Item href="/search" currentPathname={pathname} Icon={Search} />
          <div className="lg:hidden" onClick={() => setOpen(true)}>
            <Item href="" currentPathname={pathname} Icon={SquarePen} />
          </div>
          <Item href="/notify" currentPathname={pathname} Icon={BellRing} />
          <Item href="" currentPathname={pathname} Icon={Send} />
          <Item href={`/u/${user.id}`} currentPathname={pathname} Icon={User} />
        </ul>
        <div className="hidden lg:block hover:cursor-pointer">
          <Dropdown
            Icon={AlignLeft}
            options={options}
            iconClass="h-8 w-8 text-icon hover:text-threads transition-all duration-500"
            position="top"
          />
        </div>
      </div>
      <Create open={open} setOpen={setOpen} />
    </>
  );
};

export default Menu;
