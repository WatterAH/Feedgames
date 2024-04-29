import { Text } from "@/components/Global/Themed";
import { CommentInterface } from "@/interfaces/Comment";
import { router, usePathname } from "expo-router";
import React from "react";
import { Pressable, useColorScheme } from "react-native";
import { ArrowUturnLeftIcon } from "react-native-heroicons/outline";

export const ResponseButton = ({ comment }: { comment: CommentInterface }) => {
  const iconColor = useColorScheme() === "dark" ? "#888" : "#101010";
  const { id, responses, user } = comment;
  const params = { id, username: user.username };
  const pathName = usePathname();

  const handlePress = () => {
    switch (pathName) {
      case "/home/post":
      case "/home/comment":
        return router.push({ pathname: "/home/comment", params });
      case "/profile/post":
      case "/profile/likes":
      case "/profile/saves":
      case "/profile/comment":
        return router.push({ pathname: "/profile/comment", params });
      case "/notifications/post":
      case "/notifications/comment":
        return router.push({ pathname: "/notifications/comment", params });
      default:
        break;
    }
  };

  return (
    <Pressable onPress={handlePress} className="flex-row items-center gap-x-1">
      <ArrowUturnLeftIcon size={24} color={iconColor} />
      <Text className="text-gray-500 text-xs">{responses.length}</Text>
    </Pressable>
  );
};
