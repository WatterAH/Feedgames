import React, { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { View } from "../Global/Themed";
import * as Haptics from "expo-haptics";

interface Props {
  username: string;
}

export const CommentBox: React.FC<Props> = ({ username }) => {
  const [text, setText] = useState("");
  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

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
        className="p-3 w-full text-white text-xs border-gray-300 rounded-full"
        style={{ backgroundColor: "#202020" }}
        placeholderTextColor="#777"
        placeholder={`Responder a ${username}`}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        onPressIn={handlePress}
      />
    </View>
  );
};
