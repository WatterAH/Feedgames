import { goToPost } from "@/functions/navigation";
import { usePathname } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { ChatBubbleOvalLeftIcon as ChatOut } from "react-native-heroicons/outline";
import { ChatBubbleOvalLeftIcon as ChatSolid } from "react-native-heroicons/solid";

interface Props {
  id: string;
  isCommented: boolean;
  username: string;
}

export const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { id, isCommented, username } = commentData;
  const params = { id, username };
  const pathName = usePathname();

  const handlePress = () => goToPost(pathName, params);

  return (
    <Pressable onPress={handlePress}>
      {isCommented ? (
        <ChatSolid size={24} color={"#add8e6"} />
      ) : (
        <ChatOut size={24} color={"#add8e6"} />
      )}
    </Pressable>
  );
};
