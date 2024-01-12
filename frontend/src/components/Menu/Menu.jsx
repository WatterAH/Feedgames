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
  faComments as commentsSolid,
  faUser as userSolid,
  faBookmark as bookSolid,
} from "@fortawesome/free-solid-svg-icons";

import {
  faWindowRestore as windowRegular,
  faEdit as editRegular,
  faBell as bellRegular,
  faComments as commentsRegular,
  faBookmark as bookRegular,
  faUser as userRegular,
} from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";
import { NotificationDot } from "./NotificationDot";
import { MapNotify } from "../Notifications/MapNotify";
import { MapUsers } from "../Chats/MapUsers";

export const Menu = ({}) => {
  const location = useLocation();
  const path = location.pathname.toLocaleLowerCase();
  const { user } = useUser();
  const [openNotify, setOpenNotify] = useState(false);
  const [openChats, setOpenChats] = useState(false);
  let [newNotify, setNewNotify] = useState(false);

  useEffect(() => {
    const handleNewNotification = (payload) => {
      setNewNotify(user.id === payload.id_user);
    };

    const fetchUnreadNotifications = async () => {
      if (user.id) {
        const value = await hasUnreadNotifications(user.id);
        setNewNotify(value);
      }
    };

    fetchUnreadNotifications();
    subscribeToNotify(handleNewNotification);
  }, [user.id]);

  return (
    <ul className="lg:mt-10 flex h-3 lg:gap-y-5 flex-row items-center lg:items-stretch justify-between lg:flex-col z-10">
      <SlideOver
        open={openNotify}
        setOpen={setOpenNotify}
        title={"Centro de notificaciones."}
        content={<MapNotify open={openNotify} setOpen={setOpenNotify} />}
      />
      <SlideOver
        open={openChats}
        setOpen={setOpenChats}
        title={"Amigos"}
        content={<MapUsers open={openChats} setOpen={setOpenChats} />}
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
        <ListItem text={"Notificaciones"} icon={bellRegular} />
      </button>
      {/* <button
        onClick={() => {
          setOpenChats(!openChats);
        }}
      >
        <ListItem
          text={"Chats"}
          icon={path.slice(0, 7) == "/direct" ? commentsSolid : commentsRegular}
        />
      </button> */}
      <ListItem
        link={"/saved"}
        text={"Guardado"}
        icon={path == "/saved" ? bookSolid : bookRegular}
      />
      <ListItem
        link={`/profile/${user.id}`}
        text={"Perfil"}
        icon={path == `/profile/${user.id}` ? userSolid : userRegular}
      />
    </ul>
  );
};
