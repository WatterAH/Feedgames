import React from "react";
import { Link } from "react-router-dom";
import { Notification } from "../../interfaces/Notification";
import { Options } from "../Options";
import { deleteNotificationById } from "../../Api/notifications";
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

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

  const simpleClass = "h-6 text-blue-500 dark:text-blue-700";
  const icon = (int: number) => {
    const icons = [
      <HeartIcon className={simpleClass} />,
      <ChatBubbleLeftEllipsisIcon className={simpleClass} />,
      <UserPlusIcon className={simpleClass} />,
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
      toast.error(message);
    }
  };

  const options = [
    {
      icon: <TrashIcon className="h-4 md:h-5 text-red-400 mr-2" />,
      label: "Eliminar",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="relative">
      <Link
        to={`/${content}/${id_linked}`}
        className="flex items-center gap-2 bg-blue-200 dark:bg-cyan-600 hover:bg-blue-100 duration-700 cursor-pointer py-4 px-2 rounded-md shadow-md"
        onClick={handleClick}
      >
        {icon(type)}
        <p className="font-montserrat text-xs md:text-base text-gray-800 dark:text-gray-200">
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
