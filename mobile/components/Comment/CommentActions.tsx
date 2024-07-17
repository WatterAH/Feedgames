import React, { useState } from "react";
import { Text, View } from "../Global/Themed";
import { CommentInterface } from "@/interfaces/Comment";
import { LikeButton } from "./Actions/LikeButton";
import { useColorScheme } from "react-native";
import { ResponseButton } from "./Actions/ResponseButton";

interface Props {
  data: CommentInterface;
}

export const CommentActions: React.FC<Props> = React.memo(({ data }) => {
  const { id, isLiked, comments_liked, id_user } = data;
  const { responses } = data;
  const [likedNum, setLikedNum] = useState(comments_liked.length);
  const textColor = useColorScheme() === "dark" ? "#ccc" : "#424242";

  return (
    <View className="flex-row w-full justify-between mt-1">
      <View
        className="flex flex-row items-center w-10"
        style={{ columnGap: 4 }}
      >
        <LikeButton likeData={{ id, isLiked, setLikedNum, id_user }} />
        <Text className="text-xs" style={{ color: textColor }}>
          {likedNum}
        </Text>
      </View>
      <View
        className="flex flex-row items-center w-10"
        style={{ columnGap: 4 }}
      >
        <ResponseButton data={data} />
        <Text className="text-xs" style={{ color: textColor }}>
          {responses.length}
        </Text>
      </View>
    </View>
  );
});
