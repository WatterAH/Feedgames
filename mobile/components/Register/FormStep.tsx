import React from "react";
import { ScrollView, Text, View } from "../Global/Themed";
import { Button } from "../Global/Button";
import { Input } from "../Global/Input";

interface Props {
  label: string;
  placeholder: string;
  textButton: string;
  onSubmit: () => void;
}

export const FormStep: React.FC<Props> = ({
  label,
  placeholder,
  textButton,
  onSubmit,
}) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      className="flex-col gap-y-4 w-full px-5 mt-5"
      style={{ rowGap: 6 }}
    >
      <Text className="text-xl p-3 mt-5 text-center font-bold">{label}</Text>
      <Input autoFocus error={false} placeholder={placeholder} />
      <Button onPress={onSubmit}>
        <Text className="text-white dark:text-black">{textButton}</Text>
      </Button>
    </ScrollView>
  );
};
