import React, { SetStateAction, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";

interface Props extends TextInputProps {
  clear: () => void;
  text: string;
}

export const TextArea: React.FC<Props> = (props) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fff" : "#101010";

  return (
    <>
      <TextInput
        className="py-2 outline-none rounded-xl w-80"
        placeholderTextColor="#777777"
        multiline
        autoFocus
        style={{ color: textColor }}
        {...props}
      />
      {props.text.length > 0 && (
        <Pressable onPress={props.clear} style={styles.delete}>
          <XMarkIcon color={"#777777"} />
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  delete: {
    position: "absolute",
    right: 2,
  },
});
