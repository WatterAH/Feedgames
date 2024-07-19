import React from "react";
import { Text } from "./Themed";

interface Props {
  text: string;
}

export const Empty: React.FC<Props> = React.memo(({ text }) => {
  return (
    <Text className="text-base text-center max-w-xs text-gray-uni">{text}</Text>
  );
});
