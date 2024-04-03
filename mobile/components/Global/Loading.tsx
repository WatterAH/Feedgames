import React from "react";
import { View } from "react-native";

export const Loading = () => {
  return (
    <View className="flex items-center justify-center absolute bottom-2">
      <View className="animate-spin rounded-full h-5 w-5 border-t-2"></View>
    </View>
  );
};
