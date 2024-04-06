import React from "react";
import { Pressable, useColorScheme } from "react-native";
import { Text } from "../../Global/Themed";

interface Props {
  text: string;
}

export const FollowButton: React.FC<Props> = ({ text }) => {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#fff" : "#101010";

  return (
    <Pressable
      className={`w-1/2 rounded-lg py-1`}
      style={{ backgroundColor: bgColor }}
    >
      <Text
        className="text-center text-base font-semibold"
        style={{
          color: colorScheme === "dark" ? "#101010" : "#fff",
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
