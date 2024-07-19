import React from "react";
import { Pressable, PressableProps } from "react-native";
import { Text, View } from "./Themed";
import { Loading } from "./Loading";

interface Props extends PressableProps {
  h: string;
  loading: boolean;
  text: string;
}

export const Button: React.FC<Props> = (props) => {
  const { h, loading, text } = props;

  return (
    <View darkColor="transparent" lightColor="transparent" className="relative">
      <Pressable
        className={`px-3 h-${h} text-sm w-full bg-black dark:bg-white rounded-3xl flex flex-row justify-center items-center`}
        {...props}
      >
        <Text className="text-white dark:text-black font-semibold">
          {loading ? null : text}
        </Text>
        {loading ? <Loading size="small" bgcolor /> : null}
      </Pressable>
    </View>
  );
};
