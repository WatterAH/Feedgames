import React, { useState } from "react";
import { useUser } from "@/context/AuthContext";
import interactionRouter from "@/routes/interactions";
import { Heart } from "lucide-react";
import { animated } from "react-spring";
import { useAnimations } from "@/hooks/useAnimations";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updatePostInteraction } from "@/store/actions";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";
import { PostInterface } from "@/interfaces/Post";
import { cn } from "@/lib/utils";

interface Props extends PostInterface {}

const Like: React.FC<Props> = (post) => {
  const { id, user_id, liked, isLiked } = post;
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const { triggerAnimation, triggerStyle } = useAnimations();
  const [like, setLike] = useState(isLiked);
  const [likedNum, setLikedNum] = useState(liked);
  const dispatch: AppDispatch = useDispatch();

  const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (user.id === defaultUser.id) {
      return triggerAlert("cantLike");
    }

    const handleLikeAction = async () => {
      try {
        if (!like) {
          setLikedNum((prev) => prev + 1);
          dispatch(updatePostInteraction(id, "like"));
          await interactionRouter.interact({
            type: "liked",
            userId: user.id,
            postId: id,
            postUser: user_id,
          });
        } else {
          setLikedNum((prev) => prev - 1);
          dispatch(updatePostInteraction(id, "unlike"));
          await interactionRouter.uninteract("liked", user.id, id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    triggerAnimation();
    setLike(!like);

    handleLikeAction();
  };

  const AnimatedButton: React.FC<React.PropsWithChildren<any>> =
    animated.button;

  return (
    <div
      role="button"
      className="flex items-center gap-1.5 hover:text-rose-500 transition-colors group"
      onClick={handleLike}
    >
      <AnimatedButton style={triggerStyle}>
        <Heart
          size={18}
          className={cn(
            "group-hover:scale-110 transition-transform",
            like && "text-transparent",
          )}
          fill={like ? "#f43f5e" : "transparent"}
        />
      </AnimatedButton>
      <span className="text-xs">{likedNum}</span>
    </div>
  );
};

export default Like;
