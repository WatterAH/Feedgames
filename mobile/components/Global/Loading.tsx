import React from "react";
import { ActivityIndicator, useColorScheme } from "react-native";

interface Props {
  size: "large" | "small";
  bgcolor?: boolean;
}

export const Loading: React.FC<Props> = React.memo(({ size, bgcolor }) => {
  const colorScheme = useColorScheme();
  let color = colorScheme === "dark" ? "#fff" : "#000";
  if (bgcolor) {
    color = colorScheme === "dark" ? "#000" : "#fff";
  }
  return <ActivityIndicator size={size} color={color} />;
});
