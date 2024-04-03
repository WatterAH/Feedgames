import React, { useEffect, useState } from "react";
import "@theme-toggles/react/css/Classic.css";
import { ListItem } from "./ListItem";
import { SlideOver } from "../SlideOver";
import { useUser } from "../../context/AuthContext";
import * as Solid from "@heroicons/react/24/solid";
import * as Out from "@heroicons/react/24/outline";
import { hasNotifications, subscribeToNotify } from "../../Api/notifications";
import { useLocation } from "react-router-dom";
import { NotificationDot } from "./NotificationDot";
import { MapNotify } from "../Notifications/MapNotify";
import { Notification } from "../../interfaces/Notification";

export const Menu = () => {
  const location = useLocation();
  const path = location.pathname.toLocaleLowerCase();
  const { user } = useUser();
  const [openNotify, setOpenNotify] = useState(false);
  let [newNotify, setNewNotify] = useState(false);

  useEffect(() => {
    const handleNewNotification = (payload: Notification) => {
      setNewNotify(user.id === payload.id_user);
    };

    const fetchUnreadNotifications = async () => {
      if (user && user.id) {
        const value = await hasNotifications(user.id);
        setNewNotify(value);
      }
    };

    fetchUnreadNotifications();
    subscribeToNotify(handleNewNotification);
  }, [user && user.id]);

  return (
    <ul className="lg:mt-10 flex h-3 lg:gap-y-5 flex-row items-center lg:items-stretch justify-between lg:flex-col z-10">
      <SlideOver
        open={openNotify}
        setOpen={setOpenNotify}
        title={"Centro de notificaciones"}
        content={<MapNotify open={openNotify} setOpen={setOpenNotify} />}
      />
      <ListItem
        link={"/"}
        text={"Inicio"}
        Icon={path == "/" && !openNotify ? Solid.HomeIcon : Out.HomeIcon}
      />
      <ListItem
        link={"/create"}
        text={"Crear"}
        Icon={
          path == "/create" && !openNotify
            ? Solid.PencilSquareIcon
            : Out.PencilSquareIcon
        }
      />
      <button
        onClick={() => {
          setNewNotify(false);
          setOpenNotify(true);
        }}
        className="relative"
      >
        {newNotify && <NotificationDot />}
        <ListItem
          text={"Notificaciones"}
          Icon={openNotify ? Solid.BellAlertIcon : Out.BellAlertIcon}
          link={undefined as unknown as string}
        />
      </button>
      <ListItem
        link={"/saved"}
        text={"Guardado"}
        Icon={
          path == "/saved" && !openNotify
            ? Solid.BookmarkIcon
            : Out.BookmarkIcon
        }
      />
      <ListItem
        link={`/u/${user.id}`}
        text={"Perfil"}
        Icon={
          path == `/u/${user.id}` && !openNotify ? Solid.UserIcon : Out.UserIcon
        }
      />
    </ul>
  );
};
