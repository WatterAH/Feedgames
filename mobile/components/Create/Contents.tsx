import React from "react";
import { View } from "../Global/Themed";
import { PhotoIcon } from "react-native-heroicons/outline";
import { Pressable } from "react-native";

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
        <PhotoIcon color={"#777777"} />
      </Pressable>
    </View>
  );
};
