import React from "react";
import { Pressable } from "react-native";
import { Text, View } from "../Global/Themed";
import { CommentInterface } from "@/interfaces/Comment";
import { CommentHeader } from "./CommentHeader";
import { LikeButton } from "./Actions/LikeButton";
import { ResponseButton } from "./Actions/ResponseButton";

interface Props {
  data: CommentInterface;
}

export const Comment: React.FC<Props> = ({ data }) => {
  const { comment } = data;

  return (
    <Pressable>
      <View
        className="w-full duration-700 border-b border-gray-100 dark:border-neutral-800 flex-col py-5 px-3"
        style={{ rowGap: 16 }}
      >
        <CommentHeader data={data} />
        <Text>{comment}</Text>
        <View className="flex-row w-full justify-between">
          <LikeButton comment={data} />
          <ResponseButton comment={data} />
        </View>
      </View>
    </Pressable>
  );
};
