import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useUser } from "../../context/AuthContext";
import { likePost, dontLikePost } from "../../Api/interactions";

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
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <button
      onClick={handleLike}
      className="active:scale-125 transition-transform"
    >
      <FontAwesomeIcon
        icon={liked ? faHeartSolid : faHeartRegular}
        className="h-6 text-rose-400"
      />
    </button>
  );
};
