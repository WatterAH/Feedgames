import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { unSavePost, savePost } from "@/routes/interactions";
import { Bookmark } from "lucide-react";
import { useAnimations } from "@/hooks/useAnimations";
import { animated } from "react-spring";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updatePostInteraction } from "@/store/actions";
import { defaultUser } from "@/interfaces/User";
import DialogComponent from "@/components/Global/Dialog";
import { alerts } from "@/constants/alerts";

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
  const [open, setOpen] = useState(false);
  const alertData = alerts["cantSave"];

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (user.id !== defaultUser.id) {
      triggerAnimation();
      setSaved(!saved);
      setTimeout(async () => {
        try {
          if (!saved) {
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
    } else {
      setOpen(true);
    }
  };

  const AnimatedButton: React.FC<React.PropsWithChildren<any>> =
    animated.button;

  return (
    <>
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
      <DialogComponent open={open} setOpen={setOpen} {...alertData} />
    </>
  );
};

export default Save;
