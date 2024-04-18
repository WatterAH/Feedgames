import React, { useState } from "react";
import { HeartIcon as HeartOut } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useUser } from "../../../context/AuthContext";
import { likePost, dontLikePost } from "../../../Api/interactions";
import { toast } from "sonner";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  user_id: string;
}

export const LikeButton = ({ likeData }: { likeData: Props }) => {
  const { user } = useUser();
  const { id, isLiked, setLikedNum, user_id } = likeData;
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLiked(!liked);
      if (!liked) {
        setLikedNum((prevNum) => prevNum + 1);
        await likePost(user.id, id, user.username, user_id);
      } else {
        setLikedNum((prevNum) => prevNum - 1);
        await dontLikePost(user.id, id, user.username, user_id);
      }
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="active:scale-125 transition-transform"
    >
      {liked ? (
        <HeartSolid
          aria-hidden="true"
          className="h-6 text-rose-500 dark:text-rose-600"
        />
      ) : (
        <HeartOut
          aria-hidden="true"
          className="h-6 text-rose-500 dark:text-rose-600"
        />
      )}
    </button>
  );
};
