import React, { useState } from "react";
import { Pressable } from "react-native";
import { BookmarkIcon as BookOut } from "react-native-heroicons/outline";
import { BookmarkIcon as BookSolid } from "react-native-heroicons/solid";

interface Props {
  id: string;
  isSaved: boolean;
  setSavedNum?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const SaveButton = ({ saveData }: { saveData: Props }) => {
  const { id, isSaved, setSavedNum } = saveData;
  const [saved, setSaved] = useState(isSaved);

  const handleSave = async () => {
    try {
      setSaved(!saved);
      if (!saved) {
        if (setSavedNum) {
          setSavedNum((prevNum) => (prevNum ?? 0) + 1);
        }
      } else {
        if (setSavedNum) {
          setSavedNum((prevNum) => (prevNum ?? 0) - 1);
        }
      }
    } catch (error) {}
  };

  return (
    <Pressable onPress={handleSave}>
      {saved ? (
        <BookSolid size={24} color={"rgb(253, 230, 138)"} />
      ) : (
        <BookOut size={24} color={"rgb(253, 230, 138)"} />
      )}
    </Pressable>
  );
};
