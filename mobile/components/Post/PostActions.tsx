import React, { useState } from "react";
import { PostInterface } from "@/interfaces/Post";
import { LikeButton } from "./Actions/LikeButton";
import { SaveButton } from "./Actions/SaveButton";
import { CommentButton } from "./Actions/CommentButton";
import { Text, View } from "../Global/Themed";
import { useColorScheme } from "react-native";

interface Props {
  data: PostInterface;
}

export const PostActions: React.FC<Props> = React.memo(({ data }) => {
  const { id, user_id, user } = data;
  const { username } = user;
  const { saved, isSaved, liked, isLiked, comments, isCommented } = data;
  const [savedNum, setSavedNum] = useState<number | undefined>(saved);
  const [likedNum, setLikedNum] = useState(liked);
  const textColor = useColorScheme() === "dark" ? "#ccc" : "#424242";

  return (
    <View className="flex flex-row pr-3 mt-2 justify-between items-center">
      <View className="flex flex-row" style={{ columnGap: 12 }}>
        <View
          className="flex flex-row items-center w-10"
          style={{ columnGap: 4 }}
        >
          <LikeButton likeData={{ id, isLiked, setLikedNum, user_id }} />
          <Text className="text-xs" style={{ color: textColor }}>
            {likedNum}
          </Text>
        </View>
        <View
          className="flex flex-row items-center w-8"
          style={{ columnGap: 4 }}
        >
          <SaveButton saveData={{ id, isSaved, setSavedNum }} />
          <Text className="text-xs" style={{ color: textColor }}>
            {savedNum}
          </Text>
        </View>
      </View>
      <View>
        <View
          className="flex flex-row items-center pr-1"
          style={{ columnGap: 4 }}
        >
          <CommentButton commentData={{ id, isCommented, username }} />
          <Text className="text-xs" style={{ color: textColor }}>
            {comments}
          </Text>
        </View>
      </View>
    </View>
  );
});
