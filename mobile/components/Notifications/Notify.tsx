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

interface Props {
  data: Notification;
}

export const Notify: React.FC<Props> = ({ data }) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#101010";
  const { type, text, id_linked, content } = data;
  const params = { id: id_linked };

  const handlePress = () => {
    switch (content) {
      case "c":
        return router.push({ pathname: "/notifications/comment", params });
      case "p":
        return router.push({ pathname: "/notifications/post", params });
      case "u":
        return router.push({ pathname: "/notifications/profile", params });
      default:
        break;
    }
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
        <Text className="ml-3">{text}</Text>
      </View>
    </Pressable>
  );
};
