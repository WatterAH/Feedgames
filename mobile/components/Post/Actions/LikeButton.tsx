import React, { useState } from "react";
import { Pressable } from "react-native";
import { HeartIcon as HeartOut } from "react-native-heroicons/outline";
import { HeartIcon as HeartSolid } from "react-native-heroicons/solid";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  user_id: string;
}

export const LikeButton = ({ likeData }: { likeData: Props }) => {
  const { id, isLiked, setLikedNum, user_id } = likeData;
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    try {
      setLiked(!liked);
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
        <HeartSolid className="h-6" color={"rgb(244 63 94)"} />
      ) : (
        <HeartOut className="h-6" color={"rgb(244 63 94)"} />
      )}
    </Pressable>
  );
};
