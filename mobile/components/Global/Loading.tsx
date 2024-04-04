import React from "react";
import { ActivityIndicator, useColorScheme } from "react-native";

interface Props {
  size: "large" | "small";
}

export const Loading: React.FC<Props> = ({ size }) => {
  const colorScheme = useColorScheme();
  const color = colorScheme === "dark" ? "#fff" : "#000";
  return <ActivityIndicator size={size} color={color} />;
};
