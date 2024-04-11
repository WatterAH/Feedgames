import React from "react";
import { Text, View } from "../Global/Themed";
import {
  ChatBubbleOvalLeftIcon as Chat,
  HeartIcon as Heart,
  UserPlusIcon as User,
} from "react-native-heroicons/outline";
import { Notification } from "@/interfaces/Notification";
import { Pressable, useColorScheme } from "react-native";
import { Link, router } from "expo-router";

interface Props {
  data: Notification;
}

export const Notify: React.FC<Props> = ({ data }) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";

  const getIcon = (type: number) => {
    const icons = [
      <Heart color={iconColor} size={34} />,
      <Chat color={iconColor} size={34} />,
      <User color={iconColor} size={34} />,
    ];
    return icons[type];
  };
  return (
    <View className="w-full border-b p-4 border-gray-100 dark:border-neutral-800 flex-row items-center gap-x-5">
      {getIcon(data.type)}
      <Link
        href={{
          pathname: "/notifications/explore",
          params: { id: data.id_linked, type: data.content },
        }}
      >
        <Text>{data.text}</Text>
      </Link>
    </View>
  );
};
