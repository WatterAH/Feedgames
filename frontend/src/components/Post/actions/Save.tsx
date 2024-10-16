import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { unSavePost, savePost } from "@/routes/interactions";
import { Bookmark } from "lucide-react";
import { useAnimations } from "@/hooks/useAnimations";
import { animated } from "react-spring";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updatePostInteraction } from "@/store/actions";

interface Props {
  id: string;
  isSaved: boolean;
  setSavedNum: React.Dispatch<React.SetStateAction<number>>;
}

const Save = ({ saveData }: { saveData: Props }) => {
  const { user } = useUser();
  const { id, isSaved, setSavedNum } = saveData;
  const dispatch: AppDispatch = useDispatch();
  const { triggerAnimation, triggerStyle } = useAnimations();
  const [saved, setSaved] = useState(isSaved);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    triggerAnimation();
    setSaved(!saved);
    setTimeout(async () => {
      try {
        if (!isSaved) {
          setSavedNum((prev) => prev + 1);
          dispatch(updatePostInteraction(id, "save"));
          await savePost(user.id, id);
        } else {
          setSavedNum((prev) => prev - 1);
          dispatch(updatePostInteraction(id, "unsave"));
          await unSavePost(user.id, id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    }, 250);
  };

  return (
    <animated.button
      style={triggerStyle}
      onClick={handleSave}
      className="transition-transform"
    >
      <Bookmark
        aria-hidden="true"
        className="h-5 w-5 text-amber-300"
        fill={saved ? "#fcd34d" : "white"}
      />
    </animated.button>
  );
};

export default Save;
