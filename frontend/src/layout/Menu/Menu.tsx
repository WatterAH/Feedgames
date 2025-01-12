import Item from "./Item";
import Dropdown from "@/components/Global/Dropdown";
import { useUser } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import {
  AlignLeft,
  BellRing,
  House,
  Search,
  SquarePen,
  User,
} from "lucide-react";
import { useMenuOptions } from "@/hooks/useOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { clearNewNotification } from "@/store/activity";
import { defaultUser } from "@/interfaces/User";
import { useState } from "react";
import DialogComponent from "@/components/Global/Dialog";
import { alerts } from "@/constants/alerts";

interface Props {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ setCreating }) => {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const alertData = alerts["cantCreate"];
  const pathname = usePathname();
  const options = useMenuOptions(logout);
  const newNotify = useSelector((state: RootState) => state.activity.newNotify);
  const dispatch: AppDispatch = useDispatch();

  const handleCreating = () => {
    if (user.id !== defaultUser.id) {
      setCreating(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div className="w-full lg:w-20 bottom-0 fixed left-0 lg:top-0 px-3 z-50 h-14 lg:h-full bg-white lg:bg-barcelona dark:bg-coal backdrop-blur-md bg-opacity-80 flex flex-col justify-center lg:justify-between lg:py-4 lg:items-center">
        <h1 className="font-pacifico text-3xl text-threads dark:text-white text-center hidden lg:block">
          Fg
        </h1>
        <ul className="flex flex-row justify-between lg:flex-col items-center lg:py-16 gap-y-5">
          <Item href="/home" currentPathname={pathname} Icon={House} />
          <Item href="/search" currentPathname={pathname} Icon={Search} />
          <div onClick={handleCreating}>
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
      <DialogComponent open={open} setOpen={setOpen} {...alertData} />
    </>
  );
};

export default Menu;
