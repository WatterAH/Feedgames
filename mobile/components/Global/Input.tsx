import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { View } from "./Themed";
import { InformationCircleIcon } from "react-native-heroicons/outline";

interface Props extends TextInputProps {
  error: boolean;
}

export const Input: React.FC<Props> = (props) => {
  return (
    <View className="relative">
      <TextInput
        className="p-3 outline-none text-sm text-gray-700 dark:text-gray-200 border-gray-200 border rounded-xl w-full dark:border-zinc-800"
        placeholderTextColor="#777777"
        {...props}
      />
      {props.error && (
        <InformationCircleIcon
          color={"rgb(239, 68, 68)"}
          style={{ position: "absolute", right: 8, top: 12 }}
        />
      )}
    </View>
  );
};
