import React, { useState } from "react";
import { Pressable, useColorScheme } from "react-native";
import { HeartIcon as HeartOut } from "react-native-heroicons/outline";
import { HeartIcon as HeartSolid } from "react-native-heroicons/solid";
import * as Haptic from "expo-haptics";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  user_id: string;
}

export const LikeButton = ({ likeData }: { likeData: Props }) => {
  const { id, isLiked, setLikedNum, user_id } = likeData;
  const [liked, setLiked] = useState(isLiked);
  const iconColor = useColorScheme() === "dark" ? "#ccc" : "#424242";

  const handleLike = () => {
    try {
      setLiked(!liked);
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
      if (!liked) {
        setLikedNum((prevNum) => prevNum + 1);
      } else {
        setLikedNum((prevNum) => prevNum - 1);
      }
    } catch (error) {}
  };

  return (
    <Pressable onPress={handleLike}>
      {liked ? (
        <HeartSolid size={24} color={"#fb7185"} />
      ) : (
        <HeartOut size={24} color={iconColor} />
      )}
    </Pressable>
  );
};
