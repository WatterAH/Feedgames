import React, { useEffect, useState } from "react";
import "@theme-toggles/react/css/Classic.css";
import { ListItem } from "./ListItem";
import { SlideOver } from "../SlideOver";
import { useUser } from "../../context/AuthContext";
import {
  hasUnreadNotifications,
  subscribeToNotify,
} from "../../Api/notifications";
import {
  faWindowRestore as windowSolid,
  faEdit as editSolid,
  faBell as bellSolid
  faUser as userSolid,
  faBookmark as bookSolid,
} from "@fortawesome/free-solid-svg-icons";

import {
  faWindowRestore as windowRegular,
  faEdit as editRegular,
  faBell as bellRegular,
  faBookmark as bookRegular,
  faUser as userRegular,
} from "@fortawesome/free-regular-svg-icons";
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
        const value = await hasUnreadNotifications(user.id);
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
        title={"Centro de notificaciones."}
        content={<MapNotify open={openNotify} setOpen={setOpenNotify} />}
      />
      <ListItem
        link={"/"}
        text={"Inicio"}
        icon={path == "/" ? windowSolid : windowRegular}
      />
      <ListItem
        link={"/create"}
        text={"Crear"}
        icon={path == "/create" ? editSolid : editRegular}
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
          icon={openNotify ? bellSolid : bellRegular}
          link={undefined as unknown as string}
        />
      </button>
      <ListItem
        link={"/saved"}
        text={"Guardado"}
        icon={path == "/saved" ? bookSolid : bookRegular}
      />
      <ListItem
        link={`/u/${user.id}`}
        text={"Perfil"}
        icon={path == `/u/${user.id}` ? userSolid : userRegular}
      />
    </ul>
  );
};
