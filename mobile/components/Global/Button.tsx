import React from "react";
import { Pressable, PressableProps } from "react-native";

interface Props extends PressableProps {}

export const Button: React.FC<Props> = (props) => {
  return (
    <Pressable
      className="px-3 h-10 text-sm w-full bg-black dark:bg-white rounded-3xl flex flex-row justify-center items-center"
      {...props}
    >
      {props.children}
    </Pressable>
  );
};

const className =
  "px-3 h-12 text-sm w-full border-cyan-400 dark:border-cyan-400 border rounded-3xl flex flex-row justify-center items-center";
