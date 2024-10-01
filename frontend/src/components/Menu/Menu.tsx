"use client";
import Item from "./Item";
import { useUser } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { BellRing, House, Search, SquarePen, User } from "lucide-react";

const Menu = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-20 bottom-0 fixed left-0 lg:top-0 px-3 z-20 py-2 lg:py-6 h-14 lg:h-full bg-white bg-opacity-80 backdrop-blur-md">
      <ul className="flex flex-row justify-between lg:flex-col items-center h-full lg:py-9">
        <Item href="/home" currentPathname={pathname} Icon={House} />
        <Item href="/search" currentPathname={pathname} Icon={Search} />
        <Item href="/new" currentPathname={pathname} Icon={SquarePen} />
        <Item href="/notify" currentPathname={pathname} Icon={BellRing} />
        <Item href={`/u/${user.id}`} currentPathname={pathname} Icon={User} />
      </ul>
    </div>
  );
};

export default Menu;
