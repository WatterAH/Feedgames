import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { likePost, dontLikePost } from "@/routes/interactions";
import { Heart } from "lucide-react";
import { animated } from "react-spring";
import { useAnimations } from "@/hooks/useAnimations";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  user_id: string;
}

const Like = ({ likeData }: { likeData: Props }) => {
  const { user } = useUser();
  const { id, isLiked, setLikedNum, user_id } = likeData;
  const { triggerAnimation, triggerStyle } = useAnimations();
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    triggerAnimation();
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
      throw new Error(error.message);
    }
  };

  return (
    <animated.button
      style={triggerStyle}
      onClick={handleLike}
      className="transition-transform"
    >
      <Heart
        aria-hidden="true"
        className="h-5 w-5 text-rose-500"
        fill={liked ? "#f43f5e" : "white"}
      />
    </animated.button>
  );
};

export default Like;
