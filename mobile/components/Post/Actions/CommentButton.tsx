import React from "react";
import { useColorScheme } from "react-native";
import { ChatBubbleOvalLeftIcon as ChatOut } from "react-native-heroicons/outline";
import { ChatBubbleOvalLeftIcon as ChatSolid } from "react-native-heroicons/solid";

interface Props {
  id: string;
  isCommented: boolean;
  username: string;
}

export const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { isCommented } = commentData;
  const iconColor = useColorScheme() === "dark" ? "#ccc" : "#424242";

  return isCommented ? (
    <ChatSolid size={24} color={"#add8e6"} />
  ) : (
    <ChatOut size={24} color={iconColor} />
  );
};
