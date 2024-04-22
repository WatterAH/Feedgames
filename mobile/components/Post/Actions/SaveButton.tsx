import React, { useState } from "react";
import { Pressable } from "react-native";
import { BookmarkIcon as BookOut } from "react-native-heroicons/outline";
import { BookmarkIcon as BookSolid } from "react-native-heroicons/solid";
import * as Haptic from "expo-haptics";

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
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
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
        <BookSolid size={24} color={"#fde68a"} />
      ) : (
        <BookOut size={24} color={"#fde68a"} />
      )}
    </Pressable>
  );
};
