import React from "react";
import { View } from "react-native";
import { Text } from "../Global/Themed";

interface Props {
  username: string;
  name: string;
}

export const CommentCreator: React.FC<Props> = ({ username, name }) => {
  return (
    <View>
      <Text className="" style={{ fontWeight: "600" }}>
        {name}
      </Text>

      <Text
        className="hover:underline text-gray-400"
        style={{ fontFamily: "Instagram" }}
      >
        @{username}
      </Text>
    </View>
  );
};
