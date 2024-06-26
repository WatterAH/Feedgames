import React from "react";
import { View } from "./Themed";
import { Label } from "./Label";
import { Input } from "./Input";

interface Props {
  label: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
}

export const InputLabel: React.FC<Props> = ({
  label,
  text,
  setText,
  error,
}) => {
  return (
    <View className="flex flex-col">
      <Label>{label}</Label>
      <Input
        error={error}
        placeholder={label}
        onChangeText={(text) => setText(text)}
        value={text}
      />
    </View>
  );
};
