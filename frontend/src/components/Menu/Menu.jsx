import React, { useEffect, useState } from "react";
import "@theme-toggles/react/css/Classic.css";
import { ListItem } from "./ListItem";
import { SlideOver } from "../Notifications/SlideOver";
import { useUser } from "../../context/AuthContext";
import {
  hasUnreadNotifications,
  subscribeToNotify,
} from "../../Api/notifications";
import {
  faWindowRestore as windowSolid,
  faEdit as editSolid,
  faBell as bellSolid,
  faUser as userSolid,
  faBookmark as bookSolid,
} from "@fortawesome/free-solid-svg-icons";

import {
  faWindowRestore as windowRegular,
  faEdit as editRegular,
  faUser as userRegular,
  faBell as bellRegular,
  faBookmark as bookRegular,
} from "@fortawesome/free-regular-svg-icons";

export let setPfp;

export const Menu = ({}) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("Inicio");
  let [newNotify, setNewNotify] = useState(false);

  setPfp = () => {
    setCurrent("Profile");
  };

  useEffect(() => {
    const handleNewNotification = (payload) => {
      setNewNotify(user.id === payload.id_user);
    };
    subscribeToNotify(handleNewNotification);
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      hasUnreadNotifications(user.id).then((value) => setNewNotify(value));
    }
  }, [user.id]);

  return (
    <ul className="lg:mt-10 flex h-3 lg:gap-y-5 flex-row items-center lg:items-stretch justify-between lg:flex-col z-10">
      <SlideOver open={open} setOpen={setOpen} />
      <ListItem
        link={"/"}
        text={"Inicio"}
        setCurrent={setCurrent}
        icon={current == "Inicio" ? windowSolid : windowRegular}
      />
      <ListItem
        link={"/create"}
        text={"Crear"}
        setCurrent={setCurrent}
        icon={current == "Crear" ? editSolid : editRegular}
      />
      <button onClick={() => setOpen(true)}>
        <ListItem
          text={"Notificaciones"}
          setCurrent={setCurrent}
          newNotify={newNotify}
          icon={current == "Notificaciones" ? bellSolid : bellRegular}
        />
      </button>
      <ListItem
        link={"/saved"}
        text={"Guardado"}
        setCurrent={setCurrent}
        icon={current == "Guardado" ? bookSolid : bookRegular}
      />
      <ListItem
        link={`/profile/${user.id}`}
        text={"Perfil"}
        setCurrent={setCurrent}
        icon={current == "Profile" ? userSolid : userRegular}
      />
    </ul>
  );
};
