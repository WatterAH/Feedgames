import React, { useState } from "react";
import { Pressable } from "react-native";
import { HeartIcon as HeartOut } from "react-native-heroicons/outline";
import { HeartIcon as HeartSolid } from "react-native-heroicons/solid";
import * as Haptic from "expo-haptics";
import { CommentInterface } from "@/interfaces/Comment";
import { Text } from "@/components/Global/Themed";

interface Props {
  id: string;
  isLiked: boolean;
  setLikedNum: React.Dispatch<React.SetStateAction<number>>;
  user_id: string;
}

export const LikeButton = ({ comment }: { comment: CommentInterface }) => {
  const { comments_liked, isLiked, id, id_user } = comment;
  const [likedNum, setLikedNum] = useState(comments_liked.length);
  const [liked, setLiked] = useState(isLiked);

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
    <Pressable className="flex-row items-center gap-x-1" onPress={handleLike}>
      {liked ? (
        <HeartSolid size={24} color={"#fb7185"} />
      ) : (
        <HeartOut size={24} color={"#ccc"} />
      )}
      <Text className="text-xs" style={{ color: "#ccc" }}>
        {likedNum}
      </Text>
    </Pressable>
  );
};
