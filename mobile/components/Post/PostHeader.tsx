import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { View, Text } from "react-native";
import { PostCreator } from "./PostCreator";
import { ProfilePicture } from "./ProfilePicture";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";

interface Props {
  data: PostInterface;
}

export const PostHeader: React.FC<Props> = ({ data }) => {
  const { user, created_at } = data;
  const { id, username, name, pfp } = user;
  const date = calculateDate(created_at, false);

  return (
    <View className="flex flex-row justify-between">
      <View className="flex flex-row items-center" style={{ columnGap: 8 }}>
        <ProfilePicture src={pfp} w={"w-10"} h={"h-10"} />
        <PostCreator user_id={id} username={username} name={name} />
      </View>
      <View className="flex flex-col items-end">
        <EllipsisHorizontalIcon
          className="h-5 text-gray-600"
          color={"rgb(75 85 99)"}
        />
        <Text className="text-gray-400 text-xs font-rubik">{date}</Text>
      </View>
    </View>
  );
};
