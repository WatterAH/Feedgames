import { Text } from "@/components/Global/Themed";
import { CommentInterface } from "@/interfaces/Comment";
import React from "react";
import { Pressable, useColorScheme } from "react-native";
import { ArrowUturnLeftIcon } from "react-native-heroicons/outline";

export const ResponseButton = ({ comment }: { comment: CommentInterface }) => {
  const iconColor = useColorScheme() === "dark" ? "#888" : "#101010";
  const { responses } = comment;

  return (
    <Pressable className="flex-row items-center gap-x-1">
      <ArrowUturnLeftIcon size={24} color={iconColor} />
      <Text className="text-gray-500 text-xs">{responses.length}</Text>
    </Pressable>
  );
};
