import React, { useState } from "react";
import { faBookmark as bookRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as bookSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { dontSavePost, savePost } from "../../Api/interactions";

export const SaveButton = ({ saveData }) => {
  const { user } = useUser();
  const { id, isSaved, setSavedNum } = saveData;
  const [saved, setSaved] = useState(isSaved);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaved(!saved);
      if (!saved) {
        if (setSavedNum) {
          setSavedNum((prevNum) => prevNum + 1);
        }
        await savePost(user.id, id);
      } else {
        if (setSavedNum) {
          setSavedNum((prevNum) => prevNum - 1);
        }
        await dontSavePost(user.id, id);
      }
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <button
      onClick={handleSave}
      className="active:scale-125 transition-transform"
    >
      <FontAwesomeIcon
        icon={saved ? bookSolid : bookRegular}
        className="h-6 text-orange-200"
      />
    </button>
  );
};
