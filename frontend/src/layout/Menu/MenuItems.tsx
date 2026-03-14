import React from "react";
import Item from "./Item";
import { useUser } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { clearNewNotification } from "@/store/activity";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  BellRing,
  House,
  MessageCircle,
  Search,
  SquarePen,
  User,
} from "lucide-react";

interface Props {
  create: () => void;
}

const MenuItems: React.FC<Props> = ({ create }) => {
  const { user } = useUser();
  const pathname = usePathname();
  const newNotify = useSelector((state: RootState) => state.activity.newNotify);
  const dispatch: AppDispatch = useDispatch();
  const handleClearNotify = () => dispatch(clearNewNotification());

  return (
    <ul className="flex flex-row justify-between md:flex-col items-center md:py-16 gap-y-5">
      <Item href="/home" currentPath={pathname} Icon={House} />
      <Item href="/search" currentPath={pathname} Icon={Search} />
      <Item href="" currentPath={pathname} Icon={SquarePen} onClick={create} />
      {/* <Item href="/inbox" currentPath={pathname} Icon={MessageCircle} /> */}
      <div className="relative">
        {newNotify && (
          <div className="absolute z-20 right-2 top-1 bg-red-500 h-4 w-4 rounded-full"></div>
        )}
        <Item
          href="/notify"
          currentPath={pathname}
          Icon={BellRing}
          onClick={handleClearNotify}
        />
      </div>
      <Item href={`/u/${user.id}`} currentPath={pathname} Icon={User} />
    </ul>
  );
};

export default MenuItems;
