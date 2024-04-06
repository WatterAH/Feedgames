import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";

interface Props extends TextInputProps {}

export const TextArea: React.FC<Props> = (props) => {
  const [text, setText] = useState("");
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fff" : "#101010";

  return (
    <>
      <TextInput
        className="py-2 outline-none text-sm rounded-xl w-80"
        placeholderTextColor="#777777"
        multiline
        autoFocus
        value={text}
        onChangeText={setText}
        style={{ color: textColor }}
        {...props}
      />
      {text.length > 0 && (
        <Pressable onPress={() => setText("")} style={styles.delete}>
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
