import React, { useState } from "react";
import { useUser } from "@/context/AuthContext";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { dontLikeComment, likeComment } from "@/routes/comments";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  id_user: string;
}

const Like = ({ likeData }: { likeData: Props }) => {
  const { user } = useUser();
  const { id, isLiked, setLikedNum, id_user } = likeData;
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLiked(!liked);
      if (!liked) {
        setLikedNum((prevNum) => prevNum + 1);
        await likeComment(user.id, id, user.username, id_user);
      } else {
        setLikedNum((prevNum) => prevNum - 1);
        await dontLikeComment(user.id, id);
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

export default Like;
