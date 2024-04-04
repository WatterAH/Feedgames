import React from "react";
import { View } from "./Themed";
import { Label } from "./Label";
import { Input } from "./Input";
import { TextInputIOSProps } from "react-native";

interface Props {
  label: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const InputLabel: React.FC<Props> = ({ label, text, setText }) => {
  return (
    <View className="flex flex-col">
      <Label style={{ fontFamily: "OpenSans" }}>{label}</Label>
      <Input
        style={{ fontFamily: "OpenSans" }}
        placeholder={label}
        onChangeText={(text) => setText(text)}
        value={text}
      />
    </View>
  );
};
