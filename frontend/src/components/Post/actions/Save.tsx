import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { dontSavePost, savePost } from "@/routes/interactions";
import { toast } from "sonner";
import { Bookmark } from "lucide-react";
import { useAnimations } from "@/hooks/useAnimations";
import { animated } from "react-spring";

interface Props {
  id: string;
  isSaved: boolean;
  setSavedNum?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Save = ({ saveData }: { saveData: Props }) => {
  const { user } = useUser();
  const { id, isSaved, setSavedNum } = saveData;
  const [saved, setSaved] = useState(isSaved);
  const { triggerAnimation, triggerStyle } = useAnimations();

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    triggerAnimation();
    try {
      setSaved(!saved);
      if (!saved) {
        if (setSavedNum) {
          setSavedNum((prevNum) => (prevNum ?? 0) + 1);
        }
        await savePost(user.id, id);
      } else {
        if (setSavedNum) {
          setSavedNum((prevNum) => (prevNum ?? 0) - 1);
        }
        await dontSavePost(user.id, id);
      }
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    }
  };

  return (
    <animated.button
      style={triggerStyle}
      onClick={handleSave}
      className="transition-transform"
    >
      <Bookmark
        aria-hidden="true"
        className="h-6 w-6 md:h-5 md:w-5 text-amber-300"
        fill={saved ? "#fcd34d" : "white"}
      />
    </animated.button>
  );
};

export default Save;
