import React, { useEffect, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { getMyNotifications } from "../../Api/notifications";
import { Notify } from "./Notify";
import { useUser } from "../../context/AuthContext";

export const MapNotify = ({ open, setOpen }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleGetNotifications = async () => {
    try {
      setLoading(true);
      const notificationsFetched = await getMyNotifications(user.id);
      setNotifications(notificationsFetched);
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id && open) {
      handleGetNotifications();
    }
  }, [open, user.id]);

  return (
    <div className="relative mt-2">
      {loading ? (
        <LoadingPage />
      ) : notifications.length == 0 ? (
        <p className="text-gray-500 p-5 font-montserrat text-lg">
          No tienes notificaciones.
        </p>
      ) : (
        <div className="flex flex-col gap-3 px-3">
          {notifications.map((notify) => (
            <Notify
              key={notify.id}
              notify={notify}
              setOpen={setOpen}
              setNotifications={setNotifications}
            />
          ))}
        </div>
      )}
    </div>
  );
};
