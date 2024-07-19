import React from "react";
import { Text, View } from "../Global/Themed";
import {
  ChatBubbleOvalLeftIcon as Chat,
  HeartIcon as Heart,
  UserPlusIcon as User,
} from "react-native-heroicons/outline";
import { Notification } from "@/interfaces/Notification";
import { Pressable, useColorScheme } from "react-native";
import { router } from "expo-router";
import { calculateDate } from "@/functions/date";

interface Props {
  data: Notification;
}

export const Notify: React.FC<Props> = React.memo(({ data }) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  const { type, text, id_linked, content, created_at } = data;
  const date = calculateDate(created_at);

  const handlePress = () => {
    const params = { id: id_linked };
    const routes = { c: "comment", p: "post", u: "profile" };
    const pathname = `/notifications/${routes[content]}`;
    return router.push({ pathname, params });
  };

  const getIcon = (type: number) => {
    const icons = [
      <Heart color={iconColor} size={34} />,
      <Chat color={iconColor} size={34} />,
      <User color={iconColor} size={34} />,
    ];
    return icons[type];
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="w-full border-b p-4 border-gray-100 dark:border-neutral-800 flex-row items-center">
        {getIcon(type)}
        <Text className="ml-2 w-72 font-semibold">{text}</Text>
        <Text className="text-gray-uni text-xs">{date}</Text>
      </View>
    </Pressable>
  );
});
