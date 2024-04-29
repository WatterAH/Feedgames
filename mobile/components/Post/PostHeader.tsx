import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { View, Text } from "../Global/Themed";
import { PostCreator } from "./PostCreator";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { router, usePathname } from "expo-router";
import { Pressable } from "react-native";

interface Props {
  data: PostInterface;
}

export const PostHeader: React.FC<Props> = ({ data }) => {
  const { user, created_at, user_id } = data;
  const { username, name, pfp } = user;
  const params = { id: user_id };
  const date = calculateDate(created_at, false);
  const pathName = usePathname();

  const handlePress = () => {
    switch (pathName) {
      case "/home":
      case "/home/post":
        return router.push({ pathname: "/home/profile", params });
      case "/profile/post":
        return router.push({ pathname: "/profile/exploreProfile", params });
      case "/notifications/post":
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
          <PostCreator username={username} name={name} />
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
