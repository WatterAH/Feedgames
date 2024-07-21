import React from "react";
import { StyleSheet, TextProps } from "react-native";
import { Text } from "./Themed";

interface Props extends TextProps {}

export const Label: React.FC<Props> = React.memo((props) => {
  return (
    <Text style={styles.text} {...props}>
      {props.children}
    </Text>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 600,
  },
});
