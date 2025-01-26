import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { interact, uninteract } from "@/routes/interactions";
import { Bookmark } from "lucide-react";
import { useAnimations } from "@/hooks/useAnimations";
import { animated } from "react-spring";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updatePostInteraction } from "@/store/actions";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";

interface Props {
  id: string;
  isSaved: boolean;
  setSavedNum: React.Dispatch<React.SetStateAction<number>>;
}

const Save = ({ saveData }: { saveData: Props }) => {
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const { id, isSaved, setSavedNum } = saveData;
  const { triggerAnimation, triggerStyle } = useAnimations();
  const [saved, setSaved] = useState(isSaved);
  const dispatch: AppDispatch = useDispatch();

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (user.id === defaultUser.id) {
      return triggerAlert("cantSave");
    }

    const handleSaveAction = async () => {
      try {
        if (!saved) {
          setSavedNum((prev) => prev + 1);
          dispatch(updatePostInteraction(id, "save"));
          await interact({ type: "saved", postId: id, userId: user.id });
        } else {
          setSavedNum((prev) => prev - 1);
          dispatch(updatePostInteraction(id, "unsave"));
          await uninteract("saved", user.id, id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    triggerAnimation();
    setSaved(!saved);

    setTimeout(() => {
      handleSaveAction();
    }, 250);
  };

  const AnimatedButton: React.FC<React.PropsWithChildren<any>> =
    animated.button;

  return (
    <AnimatedButton
      style={triggerStyle}
      onClick={handleSave}
      className="transition-transform"
    >
      <Bookmark
        aria-hidden="true"
        className={`h-5 w-5 text-amber-300`}
        fill={saved ? "#fcd34d" : "transparent"}
      />
    </AnimatedButton>
  );
};

export default Save;
