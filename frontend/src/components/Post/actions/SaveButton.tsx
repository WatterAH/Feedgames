import React, { useState } from "react";
import { BookmarkIcon as BookOut } from "@heroicons/react/24/outline";
import { BookmarkSlashIcon as BookSolid } from "@heroicons/react/24/solid";
import { useUser } from "../../../context/AuthContext";
import { dontSavePost, savePost } from "../../../Api/interactions";
import { toast } from "sonner";

interface Props {
  id: string;
  isSaved: boolean;
  setSavedNum?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const SaveButton = ({ saveData }: { saveData: Props }) => {
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
      {saved ? (
        <BookSolid aria-hidden="true" className="h-6 text-amber-300" />
      ) : (
        <BookOut aria-hidden="true" className="h-6 text-amber-300" />
      )}
    </button>
  );
};
