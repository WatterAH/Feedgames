import React, { useEffect, useState } from "react";
import { User } from "./User";
import { LoadingPage } from "../LoadingPage";
import { getFriendsById } from "../../Api/chat";
import { useUser } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

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
      ) : (
        <div className="flex flex-col gap-3">
          <Link
            to={`/r/${"c9202cc2-5e36-41fa-b454-b0e4f8b56312"}`}
            className="px-4 py-3 border-b flex items-center gap-x-4"
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon
              icon={faGlobe}
              className="rounded-full text-sky-400 h-10 w-10"
            />
            <section>
              <p className="font-montserrat text-gray-950">Chat global</p>
            </section>
          </Link>
          {chats.map((user, index) => (
            <User key={index} user={user} setOpen={setOpen} />
          ))}
        </div>
      )}
    </div>
  );
};
