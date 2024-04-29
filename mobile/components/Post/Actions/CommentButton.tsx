import { Link, router, usePathname } from "expo-router";
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

  const handlePress = () => {
    switch (pathName) {
      case "/home":
      case "/home/profile":
        return router.push({ pathname: "/home/post", params });
      case "/profile":
      case "/profile/saves":
      case "/profile/likes":
      case "/profile/exploreProfile":
        return router.push({ pathname: "/profile/post", params });
      case "/notifications/profile":
        return router.push({ pathname: "/notifications/post", params });
      default:
        break;
    }
  };

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
