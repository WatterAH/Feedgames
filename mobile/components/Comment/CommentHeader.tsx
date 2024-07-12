import React from "react";
import { View, Text } from "../Global/Themed";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { router, usePathname } from "expo-router";
import { CommentInterface } from "@/interfaces/Comment";
import { PostCreator } from "../Post/PostCreator";
import { Pressable } from "react-native";

interface Props {
  data: CommentInterface;
}

export const CommentHeader: React.FC<Props> = ({ data }) => {
  const { user, order, id_user } = data;
  const { username, name, pfp } = user;
  const params = { id: id_user };
  const pathName = usePathname();
  const date = calculateDate(order);

  const handlePress = () => {
    switch (pathName) {
      case "/home/post":
      case "/home/comment":
        return router.push({ pathname: "/home/profile", params });
      case "/profile/post":
      case "/profile/comment":
        return router.push({ pathname: "/profile/exploreProfile", params });
      case "/notifications/post":
      case "/notifications/comment":
        return router.push({ pathname: "/notifications/profile", params });
      default:
        break;
    }
  };

  return (
    <View className="flex-row justify-between">
      <View className="flex-row gap-2 items-center">
        <Pressable onPress={handlePress}>
          <PostCreator name={name} username={username} />
        </Pressable>
        <Text style={{ color: "#777", fontSize: 15 }}>{date}</Text>
      </View>
      <EllipsisHorizontalIcon
        className="h-5 text-gray-600"
        color={"rgb(119 119 119)"}
      />
    </View>
  );
};
