import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { dontLikeComment, likeComment } from "../../Api/comments";
import { useUser } from "../../context/AuthContext";
import { CommentInterface } from "../../interfaces/Comment";

export const LikeButton = ({ comment }: { comment: CommentInterface }) => {
  const { user } = useUser();
  const { comments_liked, isLiked, id, id_user } = comment;
  const [likedNum, setLikedNum] = useState(comments_liked.length);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLiked(!liked);
      if (!liked) {
        setLikedNum(likedNum + 1);
        await likeComment(user.id, id, user.username, id_user);
      } else {
        setLikedNum(likedNum - 1);
        await dontLikeComment(user.id, id);
      }
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      <button
        onClick={handleLike}
        className="active:scale-125 transition-transform"
      >
        <FontAwesomeIcon
          icon={liked ? faHeartSolid : faHeartRegular}
          className="h-4 text-red-300"
        />
      </button>
      <p className="text-gray-500 text-xs hover:underline">{likedNum}</p>
    </div>
  );
};
