import React, { useCallback } from "react";
import { View, Text } from "../Global/Themed";
import { calculateDate } from "@/functions/date";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { usePathname } from "expo-router";
import { CommentInterface } from "@/interfaces/Comment";
import { goToProfile } from "@/functions/navigation";
import { TouchableOpacity } from "react-native";

interface Props {
  data: CommentInterface;
}

export const CommentHeader: React.FC<Props> = React.memo(({ data }) => {
  const { user, order, id_user } = data;
  const { username } = user;
  const pathName = usePathname();
  const mainPath = pathName.split("/")[1];
  const date = calculateDate(order);

  const handleProfilePress = useCallback(() => {
    goToProfile(mainPath, { id: id_user });
  }, [mainPath, data]);

  return (
    <View className="flex-row justify-between mr-2">
      <View className="flex-row gap-2">
        <TouchableOpacity onPress={handleProfilePress} activeOpacity={1}>
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
