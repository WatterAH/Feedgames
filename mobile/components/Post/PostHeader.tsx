import React, { useCallback } from "react";
import { PostInterface } from "@/interfaces/Post";
import { View, Text } from "../Global/Themed";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { usePathname } from "expo-router";
import { TouchableOpacity } from "react-native";
import { goToProfile } from "@/functions/navigation";

interface Props {
  data: PostInterface;
}

export const PostHeader: React.FC<Props> = React.memo(({ data }) => {
  const { user, order, user_id } = data;
  const { username } = user;
  const date = calculateDate(order);
  const pathName = usePathname();
  const mainPath = pathName.split("/")[1];

  const handleProfilePress = useCallback(() => {
    goToProfile(mainPath, { id: user_id });
  }, [mainPath, user_id]);

  return (
    <View className="flex-row justify-between mr-2">
      <View className="flex-row gap-2">
        <TouchableOpacity activeOpacity={1} onPress={handleProfilePress}>
          <Text className="font-semibold">{username}</Text>
        </TouchableOpacity>
        <Text className="text-gray-uni">{date}</Text>
      </View>
      <EllipsisHorizontalIcon
        className="h-5 text-gray-600"
        color={"rgb(119 119 119)"}
      />
    </View>
  );
});
