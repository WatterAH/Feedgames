import React from "react";
import { View } from "../Global/Themed";
import { Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface Props {
  handlePress: () => void;
}

export const Contents: React.FC<Props> = ({ handlePress }) => {
  return (
    <View
      lightColor="#fff"
      darkColor="#181818"
      className="flex-row items-center mt-3"
    >
      <Pressable onPress={handlePress}>
        <FontAwesome6 name="image" size={24} color={"#777"} />
      </Pressable>
    </View>
  );
};
