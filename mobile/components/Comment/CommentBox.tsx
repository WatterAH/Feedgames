import React, { useState } from "react";
import { TextInput, useColorScheme } from "react-native";
import { View } from "../Global/Themed";
import * as Haptics from "expo-haptics";
import { useSession } from "@/context/ctx";

export const CommentBox = () => {
  const backgroundColor = useColorScheme() === "dark" ? "#202020" : "#ebebeb";
  const { user } = useSession();
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      if (!text.trim()) {
        return Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Error
        );
      }
    } catch (error) {}
  };

  return (
    <View className="w-full px-2 pt-3 items-center border-t border-gray-100 dark:border-neutral-800 mb-3">
      <TextInput
        className="p-3 w-full text-black dark:text-white border-gray-300 rounded-full"
        style={{ backgroundColor }}
        placeholder={`Responder como ${user?.name}`}
        value={text}
        onChangeText={(string) => setText(string)}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};
