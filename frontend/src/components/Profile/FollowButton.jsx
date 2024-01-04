import React, { useState } from "react";
import { faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useUser } from "../../context/AuthContext";
import { dontFollowUser, followUser } from "../../Api/interactions";

export const FollowButton = ({ userData }) => {
  const { user } = useUser();
  const { id, follow: isFollow } = userData;
  const [followed, setFollowed] = useState(isFollow);

  const handleFollow = async () => {
    try {
      setFollowed(!followed);
      if (!followed) {
        await followUser(user.id, id, user.username);
      } else {
        await dontFollowUser(user.id, id, user.username);
      }
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <button
      className="active:scale-125 transition-transform"
      onClick={handleFollow}
    >
      <FontAwesomeIcon
        icon={followed ? faUserCheck : faUserPlus}
        className={`h-4 md:h-5 ${
          followed ? "text-emerald-400" : "text-gray-400"
        }`}
      />
    </button>
  );
};
