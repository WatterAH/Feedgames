import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

export const Input: React.FC<Props> = (props) => {
  return (
    <TextInput
      className="p-3 outline-none text-sm text-gray-700 dark:text-gray-200 border-gray-200 border rounded-xl w-full dark:bg-zinc-800 dark:border-zinc-800"
      placeholderTextColor="rgb(107, 114, 128)"
      {...props}
    />
  );
};
