import React from "react";
import { Pressable, Share, useColorScheme } from "react-native";
import { Text } from "../../Global/Themed";
import { User } from "@/interfaces/User";
import * as Haptic from "expo-haptics";

interface Props {
  text: string;
  data: User;
}

export const ShareProfile: React.FC<Props> = ({ text, data }) => {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const borderColor = dark ? "border-zinc-700" : "border-zinc-300";
  const { username } = data;

  const onShare = async () => {
    try {
      Haptic.selectionAsync();
      const result = await Share.share({
        message: `@${username} en Feedgames`,
      });
    } catch (error) {}
  };

  return (
    <Pressable
      onPress={onShare}
      className={`w-1/2 rounded-lg py-1 border ${borderColor}`}
    >
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
