import React from "react";
import { View } from "../Global/Themed";
import { PhotoIcon } from "react-native-heroicons/outline";

export const Contents = () => {
  return (
    <View
      lightColor="#fff"
      darkColor="#181818"
      className="flex-row items-center mt-3"
    >
      <PhotoIcon color={"#777777"} />
    </View>
  );
};
