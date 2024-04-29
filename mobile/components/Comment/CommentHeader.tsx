import React from "react";
import { View, Text } from "../Global/Themed";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { Link, router, usePathname } from "expo-router";
import { CommentInterface } from "@/interfaces/Comment";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { PostCreator } from "../Post/PostCreator";
import { Pressable } from "react-native";

interface Props {
  data: CommentInterface;
}

export const CommentHeader: React.FC<Props> = ({ data }) => {
  const { user, created_at, id_user } = data;
  const { username, name, pfp } = user;
  const params = { id: id_user };
  const pathName = usePathname();
  const date = calculateDate(created_at, false);

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
      <Pressable onPress={handlePress}>
        <View className="flex-row items-center" style={{ columnGap: 8 }}>
          <ProfilePicture src={pfp} w={"w-10"} h={"h-10"} />
          <PostCreator name={name} username={username} />
        </View>
      </Pressable>
      <View className="flex flex-col items-end gap-y-2">
        <EllipsisHorizontalIcon
          className="h-5 text-gray-600"
          color={"rgb(75 85 99)"}
        />
        <Text className="text-gray-400 text-xs font-rubik">{date}</Text>
      </View>
    </View>
  );
};
