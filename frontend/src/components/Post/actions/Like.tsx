import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { likePost, unLikePost } from "@/routes/interactions";
import { Heart } from "lucide-react";
import { animated } from "react-spring";
import { useAnimations } from "@/hooks/useAnimations";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updatePostInteraction } from "@/store/actions";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  user_id: string;
}

const Like = ({ likeData }: { likeData: Props }) => {
  const { user } = useUser();
  const { id, isLiked, user_id, setLikedNum } = likeData;
  const dispatch: AppDispatch = useDispatch();
  const { triggerAnimation, triggerStyle } = useAnimations();
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    triggerAnimation();
    setLiked(!liked);
    setTimeout(async () => {
      try {
        if (!isLiked) {
          setLikedNum((prev) => prev + 1);
          dispatch(updatePostInteraction(id, "like"));
          await likePost(user.id, id, user.username, user_id);
        } else {
          setLikedNum((prev) => prev - 1);
          dispatch(updatePostInteraction(id, "unlike"));
          await unLikePost(user.id, id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    }, 250);
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
