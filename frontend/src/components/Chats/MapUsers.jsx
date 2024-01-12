import React, { useEffect, useState } from "react";
import { User } from "./User";
import { LoadingPage } from "../LoadingPage";
import { getFriendsById } from "../../Api/chat";
import { useUser } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const MapUsers = ({ setOpen, open }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([1, 2, 4]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const chatsFetched = await getFriendsById(user.id);
      setChats(chatsFetched);
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
      fetchFriends();
    }
  }, [user.id, open]);

  return (
    <div className={`${loading ? "mt-5" : "mt-0"}`}>
      {loading ? (
        <LoadingPage />
      ) : chats.length == 0 ? (
        <p className="text-gray-500 font-montserrat text-lg">
          Tus amigos apareceran aquí.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {chats.map((user) => (
            <User user={user} setOpen={setOpen} />
          ))}
        </div>
      )}
    </div>
  );
};
