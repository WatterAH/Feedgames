import React from "react";
import { Text } from "./Themed";

interface Props {
  label: string;
}

export const Title: React.FC<Props> = ({ label }) => {
  return (
    <Text className="text-lg p-3 mt-5 text-center font-bold">{label}</Text>
  );
};
