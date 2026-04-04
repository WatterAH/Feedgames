import React from "react";
import Item from "./Item";
import { useUser } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { clearNewNotification } from "@/store/activity";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { BProgress } from "@bprogress/core";
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
  handleOpen: () => void;
}

const MenuItems: React.FC<Props> = ({ handleOpen }) => {
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const pathname = usePathname();
  const newAlert = useSelector((state: RootState) => state.activity.newAlert);
  const newMessage = useSelector((state: RootState) => state.inbox.hasUnread);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  function profile() {
    if (user.id === defaultUser.id) {
      return triggerAlert("cantMe");
    } else {
      BProgress.start();
      return router.push("/me");
    }
  }

  function notify() {
    if (user.id === defaultUser.id) {
      return triggerAlert("cantNotify");
    } else {
      BProgress.start();
      dispatch(clearNewNotification());
      return router.push("/alerts");
    }
  }

  function create() {
    if (user.id === defaultUser.id) {
      return triggerAlert("cantCreate");
    } else {
      handleOpen();
    }
  }

  function inbox() {
    if (user.id === defaultUser.id) {
      return triggerAlert("cantInbox");
    } else {
      BProgress.start();
      return router.push("/party");
    }
  }

  return (
    <ul className="flex flex-row justify-between md:flex-col items-center md:py-16 gap-y-5">
      <Item href="/home" currentPath={pathname} Icon={House} />
      <Item href="/search" currentPath={pathname} Icon={Search} />
      <Item href="" currentPath={pathname} Icon={SquarePen} onClick={create} />
      <Item
        href="/party"
        currentPath={pathname}
        Icon={MessageCircle}
        onClick={inbox}
        showBadge={newMessage}
      />
      <Item
        href="/alerts"
        currentPath={pathname}
        Icon={BellRing}
        onClick={notify}
        showBadge={newAlert}
      />
      <Item href="/me" currentPath={pathname} Icon={User} onClick={profile} />
    </ul>
  );
};

export default MenuItems;
