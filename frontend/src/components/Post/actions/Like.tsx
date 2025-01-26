import React, { useState } from "react";
import { useUser } from "@/context/AuthContext";
import { interact, uninteract } from "@/routes/interactions";
import { Heart } from "lucide-react";
import { animated } from "react-spring";
import { useAnimations } from "@/hooks/useAnimations";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updatePostInteraction } from "@/store/actions";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  user_id: string;
}

const Like = ({ likeData }: { likeData: Props }) => {
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const { id, isLiked, user_id, setLikedNum } = likeData;
  const { triggerAnimation, triggerStyle } = useAnimations();
  const [liked, setLiked] = useState(isLiked);
  const dispatch: AppDispatch = useDispatch();

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (user.id === defaultUser.id) {
      return triggerAlert("cantLike");
    }

    const handleLikeAction = async () => {
      try {
        if (!liked) {
          setLikedNum((prev) => prev + 1);
          dispatch(updatePostInteraction(id, "like"));
          await interact({
            type: "liked",
            userId: user.id,
            postId: id,
            postUser: user_id,
            username: user.username,
          });
        } else {
          setLikedNum((prev) => prev - 1);
          dispatch(updatePostInteraction(id, "unlike"));
          await uninteract("liked", user.id, id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    triggerAnimation();
    setLiked(!liked);

    setTimeout(() => {
      handleLikeAction();
    }, 250);
  };

  const AnimatedButton: React.FC<React.PropsWithChildren<any>> =
    animated.button;

  return (
    <AnimatedButton
      style={triggerStyle}
      onClick={handleLike}
      className="transition-transform"
    >
      <Heart
        aria-hidden="true"
        className={`h-5 w-5 text-red-500`}
        fill={liked ? "#f43f5e" : "transparent"}
      />
    </AnimatedButton>
  );
};

export default Like;
