import React, { useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { LikeButton } from "./Actions/LikeButton";
import { SaveButton } from "./Actions/SaveButton";
import { CommentButton } from "./Actions/CommentButton";
import { Text, View } from "../Global/Themed";

interface Props {
  data: PostInterface;
}

export const PostActions: React.FC<Props> = ({ data }) => {
  const { id, user_id } = data;
  const { saved, isSaved, liked, isLiked, comments, isCommented } = data;
  const [savedNum, setSavedNum] = useState<number | undefined>(saved);
  const [likedNum, setLikedNum] = useState(liked);

  return (
    <View className="flex flex-row justify-between items-center">
      <View className="flex flex-row" style={{ columnGap: 12 }}>
        <View className="flex flex-row items-center" style={{ columnGap: 4 }}>
          <LikeButton likeData={{ id, isLiked, setLikedNum, user_id }} />
          <Text className="text-gray-500 text-xs">{likedNum}</Text>
        </View>
        <View className="flex flex-row items-center" style={{ columnGap: 4 }}>
          <SaveButton saveData={{ id, isSaved, setSavedNum }} />
          <Text className="text-gray-500 text-xs">{savedNum}</Text>
        </View>
      </View>
      <View>
        <View className="flex flex-row items-center" style={{ columnGap: 4 }}>
          <CommentButton commentData={{ id, isCommented }} />
          <Text className="text-gray-500 text-xs">{comments}</Text>
        </View>
      </View>
    </View>
  );
};
