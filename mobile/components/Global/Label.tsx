import React from "react";
import { TextProps } from "react-native";
import { Text } from "./Themed";

interface Props extends TextProps {}

export const Label: React.FC<Props> = (props) => {
  return (
    <Text className="mb-1 text-xs" {...props}>
      {props.children}
    </Text>
  );
};
