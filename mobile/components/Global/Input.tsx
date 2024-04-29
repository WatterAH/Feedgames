import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  error: boolean;
}

export const Input: React.FC<Props> = (props) => {
  return (
    <TextInput
      className="py-4 px-3 outline-none text-gray-700 dark:text-gray-200 border border-gray-300 rounded-2xl w-full"
      placeholderTextColor="#777"
      {...props}
    />
  );
};
