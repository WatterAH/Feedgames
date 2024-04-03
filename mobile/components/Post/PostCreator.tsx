import React from "react";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text } from "../Global/Themed";

interface Props {
  user_id: string;
  username: string;
  name: string;
}

export const PostCreator: React.FC<Props> = ({ user_id, username, name }) => {
  return (
    <View>
      <Text className="text-lg">{name}</Text>
      <Link href={"/profile"} className="flex items-center gap-x-1">
        <Text className="hover:underline text-gray-400 text-sm">
          @{username}
        </Text>
      </Link>
    </View>
  );
};
