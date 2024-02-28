import React from "react";
import { Link } from "react-router-dom";
import { Notification } from "../../interfaces/Notification";
import { Options } from "../Options";
import { deleteNotificationById } from "../../Api/notifications";
import { toast } from "react-toastify";
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

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
    const icons = [
      <HeartIcon className="h-6 text-blue-500" />,
      <ChatBubbleLeftEllipsisIcon className="h-6 text-blue-500" />,
      <UserPlusIcon className="h-6 text-blue-500" />,
    ];
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
      Icon: TrashIcon,
      textColor: "text-red-500",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="relative">
      <Link
        to={`/${content}/${id_linked}`}
        className="flex items-center gap-2 bg-blue-200 hover:bg-blue-100 duration-700 cursor-pointer py-4 px-2 rounded-md shadow-md"
        onClick={handleClick}
      >
        {icon(type)}
        <p className="font-montserrat text-xs md:text-base text-gray-800">
          {text}
        </p>
      </Link>
      <section className="ml-auto absolute bottom-4 right-2"></section>
      <span className="absolute right-3 top-4">
        <Options
          Icon_options={EllipsisHorizontalIcon}
          options={options}
          className="h-5 text-gray-700"
        />
      </span>
    </div>
  );
};
