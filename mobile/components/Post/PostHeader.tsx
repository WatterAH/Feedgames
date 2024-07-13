import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { View, Text } from "../Global/Themed";
import { PostCreator } from "./PostCreator";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { usePathname } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { goToProfile } from "@/functions/navigation";

interface Props {
  data: PostInterface;
}

export const PostHeader: React.FC<Props> = ({ data }) => {
  const { user, user_id, order } = data;
  const { username, name } = user;
  const params = { id: user_id };
  const date = calculateDate(order);
  const pathName = usePathname();

  const handlePress = () => goToProfile(pathName, params);

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row gap-2 items-center">
        <TouchableOpacity onPress={handlePress}>
          <PostCreator username={username} name={name} />
        </TouchableOpacity>
        <Text style={{ color: "#777", fontSize: 15 }}>{date}</Text>
      </View>
      <EllipsisHorizontalIcon
        className="h-5 text-gray-600"
        color={"rgb(119 119 119)"}
      />
    </View>
  );
};
