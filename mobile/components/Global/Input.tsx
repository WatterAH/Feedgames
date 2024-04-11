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
        className={`p-3 outline-none text-sm text-gray-700 dark:text-gray-200 border border-gray-200  rounded-xl w-full dark:border-${
          props.error ? "red-500" : "zinc-800"
        }`}
        placeholderTextColor="#777777"
        {...props}
      />
    </View>
  );
};
