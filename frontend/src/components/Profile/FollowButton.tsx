import React, { useState } from "react";
import { useUser } from "../../context/AuthContext";
import { dontFollowUser, followUser } from "../../Api/interactions";
import { User } from "../../interfaces/User";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export const FollowButton = ({ userData }: { userData: User }) => {
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
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    }
  };

  return (
    <button
      className="active:scale-125 transition-transform"
      onClick={handleFollow}
    >
      {followed ? (
        <UserMinusIcon aria-hidden="true" className="h-6 text-emerald-500" />
      ) : (
        <UserPlusIcon aria-hidden="true" className="h-6 text-gray-400" />
      )}
    </button>
  );
};
