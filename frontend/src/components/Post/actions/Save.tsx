import React, { useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { dontSavePost, savePost } from "@/routes/interactions";
import { toast } from "sonner";
import { Bookmark } from "lucide-react";

interface Props {
  id: string;
  isSaved: boolean;
  setSavedNum?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Save = ({ saveData }: { saveData: Props }) => {
  const { user } = useUser();
  const { id, isSaved, setSavedNum } = saveData;
  const [saved, setSaved] = useState(isSaved);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    <button
      onClick={handleSave}
      className="active:scale-125 transition-transform"
    >
      <Bookmark
        aria-hidden="true"
        className="h-5 text-amber-300"
        fill={saved ? "#fcd34d" : "white"}
      />
    </button>
  );
};

export default Save;
