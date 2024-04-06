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
      <Text className="" style={{ fontWeight: "600" }}>
        {name}
      </Text>
      <Link
        href={{
          pathname: `/home/${user_id}`,
        }}
      >
        <Text
          className="hover:underline text-gray-400"
          style={{ fontFamily: "Instagram" }}
        >
          @{username}
        </Text>
      </Link>
    </View>
  );
};
