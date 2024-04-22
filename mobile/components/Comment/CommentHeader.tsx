import React from "react";
import { View, Text } from "../Global/Themed";
// import { PostCreator } from "./PostCreator";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { Link } from "expo-router";
import { CommentInterface } from "@/interfaces/Comment";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { CommentCreator } from "./CommentCreator";

interface Props {
  data: CommentInterface;
}

export const CommentHeader: React.FC<Props> = ({ data }) => {
  const { user, created_at, id_user } = data;
  const { username, name, pfp } = user;
  const date = calculateDate(created_at, false);

  return (
    <View className="flex-row justify-between">
      <Link
        href={{
          pathname: "/home/profile",
          params: { id: id_user },
        }}
      >
        <View className="flex-row items-center" style={{ columnGap: 8 }}>
          <ProfilePicture src={pfp} w={"w-10"} h={"h-10"} />
          <CommentCreator name={name} username={username} />
        </View>
      </Link>
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
