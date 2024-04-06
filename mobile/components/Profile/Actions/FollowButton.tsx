import React from "react";
import { Pressable, PressableProps, useColorScheme } from "react-native";
import { Text } from "../../Global/Themed";

interface Props extends PressableProps {
  text: string;
  follow: boolean;
}

export const FollowButton: React.FC<Props> = (props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark" ? true : false;
  const bgColor =
    isDark && !props.follow
      ? "#fff"
      : !isDark && props.follow
      ? "#fff"
      : "#101010";
  const border = props.follow ? "border" : "";

  return (
    <Pressable
      className={`w-1/2 rounded-lg py-1 border-zinc-${
        isDark ? "700" : "300"
      } ${border}`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <Text
        className="text-center text-base font-semibold"
        style={{
          color:
            isDark && !props.follow
              ? "#101010"
              : !isDark && props.follow
              ? "#101010"
              : "#fff",
          fontWeight: "600",
        }}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};
