import Item from "./Item";
import Create from "@/components/New/Create";
import Dropdown from "@/components/Global/Dropdown";
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
import { useMenuOptions } from "@/hooks/useOptions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { clearNewNotification } from "@/store/activity";

const Menu = () => {
  const { logout } = useUser();
  const pathname = usePathname();
  const options = useMenuOptions(logout);
  const [open, setOpen] = useState(false);
  const newNotify = useSelector((state: RootState) => state.activity.newNotify);
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div className="w-full lg:w-20 bottom-0 fixed left-0 lg:top-0 px-3 z-50 h-14 lg:h-full bg-barcelona dark:bg-coal backdrop-blur-md bg-opacity-80 flex flex-col justify-center lg:justify-between lg:py-4 lg:items-center">
        <h1 className="font-pacifico text-3xl text-threads dark:text-white text-center hidden lg:block">
          Fg
        </h1>
        <ul className="flex flex-row justify-between lg:flex-col items-center lg:py-16 gap-y-5">
          <Item href="/home" currentPathname={pathname} Icon={House} />
          <Item href="/search" currentPathname={pathname} Icon={Search} />
          <div className="lg:hidden" onClick={() => setOpen(true)}>
            <Item href="" currentPathname={pathname} Icon={SquarePen} />
          </div>
          <div
            className="relative"
            onClick={() => dispatch(clearNewNotification())}
          >
            {newNotify && (
              <div className="absolute z-20 right-2 top-1 bg-red-500 h-4 w-4 rounded-full"></div>
            )}
            <Item href="/notify" currentPathname={pathname} Icon={BellRing} />
          </div>
          <Item href="" currentPathname={pathname} Icon={Send} />
          <Item href="/me" currentPathname={pathname} Icon={User} />
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
