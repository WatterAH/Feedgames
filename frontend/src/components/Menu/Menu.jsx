import React, { useEffect, useState } from "react";
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
import "@theme-toggles/react/css/Classic.css";
import { displayContent } from "../../home/Home";
import { ListItem } from "./ListItem";
import { SlideOver } from "../Notifications/SlideOver";
import { useUser } from "../../context/AuthContext";
import {
  hasUnreadNotifications,
  subscribeToNotify,
} from "../../Api/notifications";

export const Menu = ({ currentContent }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  let [newNotify, setNewNotify] = useState(false);

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

  const menuItems = [
    {
      solid: windowSolid,
      regular: windowRegular,
      text: "Inicio",
      content: "Feed",
      onClick: () => displayContent("Feed"),
    },
    {
      solid: editSolid,
      regular: editRegular,
      text: "Crear",
      content: "Create",
      onClick: () => displayContent("Create"),
    },
    {
      solid: bellSolid,
      regular: bellRegular,
      text: "Notificaciones",
      content: "Notify",
      onClick: () => {
        setOpen(true);
        setNewNotify(false);
      },
    },
    {
      solid: bookSolid,
      regular: bookRegular,
      text: "Guardado",
      content: "Saved",
      onClick: () => displayContent("Saved"),
    },
    {
      solid: userSolid,
      regular: userRegular,
      text: "Perfil",
      content: "Profile",
      onClick: () => displayContent("Profile"),
    },
  ];

  return (
    <ul className="lg:mt-10 flex h-3 lg:gap-y-5 flex-row items-center lg:items-stretch justify-between lg:flex-col z-10">
      <SlideOver open={open} setOpen={setOpen} />
      {menuItems.map((item, index) => (
        <ListItem
          key={index}
          newNotify={newNotify}
          item={item}
          currentContent={currentContent}
        ></ListItem>
      ))}
    </ul>
  );
};
