import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { likePost, dontLikePost } from "@/routes/interactions";
import { toast } from "sonner";
import { Heart } from "lucide-react";

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
      <Heart
        aria-hidden="true"
        className="h-5 text-rose-500"
        fill={liked ? "#f43f5e" : "white"}
      />
    </button>
  );
};
