import React from "react";
import { Pressable, useColorScheme } from "react-native";
import { Text } from "../../Global/Themed";

interface Props {
  text: string;
}

export const ShareProfile: React.FC<Props> = ({ text }) => {
  const colorScheme = useColorScheme();
  const borderColor =
    colorScheme === "dark" ? "border-zinc-700" : "border-zinc-300";

  return (
    <Pressable className={`w-1/2 rounded-lg py-1 border ${borderColor}`}>
      <Text
        className="text-center text-base font-semibold"
        style={{
          color: colorScheme === "dark" ? "#fff" : "#101010",
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
