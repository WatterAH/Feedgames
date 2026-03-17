import React from "react";
import Item from "./Item";
import { useUser } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
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
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";

interface Props {
  create: () => void;
}

const MenuItems: React.FC<Props> = ({ create }) => {
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const pathname = usePathname();
  const newAlert = useSelector((state: RootState) => state.activity.newAlert);
  const dispatch: AppDispatch = useDispatch();
  const handleClearNotify = () => dispatch(clearNewNotification());
  const router = useRouter();

  function profile() {
    if (user.id === defaultUser.id) {
      return triggerAlert("cantMe");
    } else {
      return router.push("/me");
    }
  }

  return (
    <ul className="flex flex-row justify-between md:flex-col items-center md:py-16 gap-y-5">
      <Item href="/home" currentPath={pathname} Icon={House} />
      <Item href="/search" currentPath={pathname} Icon={Search} />
      <Item href="" currentPath={pathname} Icon={SquarePen} onClick={create} />
      {/* <Item href="/inbox" currentPath={pathname} Icon={MessageCircle} /> */}
      <div className="relative">
        {newAlert && (
          <div className="absolute z-20 right-2 top-1 bg-red-500 h-4 w-4 rounded-full"></div>
        )}
        <Item
          href="/alerts"
          currentPath={pathname}
          Icon={BellRing}
          onClick={handleClearNotify}
        />
      </div>
      <Item href="/me" currentPath={pathname} Icon={User} onClick={profile} />
    </ul>
  );
};

export default MenuItems;
