import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";

interface Props extends TextInputProps {}

export const Input: React.FC<Props> = React.memo((props) => {
  const dark = useColorScheme() === "dark";
  const color = dark ? "#e5e7eb" : "#374151";
  const borderColor = dark ? "#202020" : "#eaeaea";

  return (
    <TextInput
      style={[styles.input, { color, borderColor }]}
      placeholderTextColor={dark ? "#777" : "#aaa"}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#202020",
    borderRadius: 16,
    width: "100%",
  },
});
