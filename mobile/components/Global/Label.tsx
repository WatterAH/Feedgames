import React from "react";
import { TextProps } from "react-native";
import { Text } from "./Themed";

interface Props extends TextProps {}

export const Label: React.FC<Props> = (props) => {
  return (
    <Text className="mb-1 text-xs" style={{ fontWeight: "700" }} {...props}>
      {props.children}
    </Text>
  );
};
