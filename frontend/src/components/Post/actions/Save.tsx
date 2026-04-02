import React, { useState } from "react";
import { useUser } from "@/context/AuthContext";
import interactionRouter from "@/routes/interactions";
import { Bookmark } from "lucide-react";
import { useAnimations } from "@/hooks/useAnimations";
import { animated } from "react-spring";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updatePostInteraction } from "@/store/actions";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";
import { cn } from "@/lib/utils";
import { PostInterface } from "@/interfaces/Post";

interface Props extends PostInterface {}

const Save: React.FC<Props> = (post) => {
  const { id, user_id, saved, isSaved } = post;
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const { triggerAnimation, triggerStyle } = useAnimations();
  const [save, setSave] = useState(isSaved);
  const [savedNum, setSavedNum] = useState<number>(saved);
  const dispatch: AppDispatch = useDispatch();

  const handleSave = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (user.id === defaultUser.id) {
      return triggerAlert("cantSave");
    }

    const handleSaveAction = async () => {
      try {
        if (!save) {
          setSavedNum((prev) => prev + 1);
          dispatch(updatePostInteraction(id, "save"));
          await interactionRouter.interact({
            type: "saved",
            postId: id,
            userId: user.id,
          });
        } else {
          setSavedNum((prev) => prev - 1);
          dispatch(updatePostInteraction(id, "unsave"));
          await interactionRouter.uninteract("saved", user.id, id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    triggerAnimation();
    setSave(!save);

    handleSaveAction();
  };

  const AnimatedButton: React.FC<React.PropsWithChildren<any>> =
    animated.button;

  return (
    <div
      role="button"
      className="flex items-center gap-1.5 hover:text-amber-300 transition-colors group"
      onClick={handleSave}
    >
      <AnimatedButton style={triggerStyle}>
        <Bookmark
          size={18}
          className={cn(
            "group-hover:scale-110 transition-transform",
            save && "text-transparent",
          )}
          fill={save ? "#fcd34d" : "transparent"}
        />
      </AnimatedButton>
      <span className="text-xs">{savedNum}</span>
    </div>
  );
};

export default Save;
