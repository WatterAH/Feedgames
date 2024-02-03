import {
  faComments,
  faEllipsis,
  faHeart,
  faTrash,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Notification } from "../../interfaces/Notification";
import { Options } from "../Options";
import { deleteNotificationById } from "../../Api/notifications";
import { toast } from "react-toastify";

interface Props {
  notify: Notification;
  setOpen: (value: boolean) => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const Notify: React.FC<Props> = ({
  notify,
  setOpen,
  setNotifications,
}) => {
  const { id, id_linked, content, text, type } = notify;
  const icon = (int: number) => {
    const icons = [faHeart, faComments, faUserGroup];
    return icons[int];
  };

  const handleClick = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteNotificationById(id);
      setNotifications((prev) => prev.filter((notify) => notify.id != id));
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const options = [
    {
      label: "Eliminar",
      icon: faTrash,
      textColor: "text-red-500",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="relative">
      <Link
        to={`/${content}/${id_linked}`}
        className="flex items-center gap-3 bg-blue-200 hover:bg-blue-100 duration-700 cursor-pointer py-4 px-2 rounded-md shadow-md"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={icon(type)} className="h-6 text-blue-500" />
        <p className="font-montserrat text-xs md:text-base text-gray-800">
          {text}
        </p>
      </Link>
      <section className="ml-auto absolute bottom-4 right-2"></section>
      <span className="absolute right-3 top-4">
        <Options icon_options={faEllipsis} options={options} />
      </span>
    </div>
  );
};
