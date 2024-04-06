import React from "react";
import { Text, View } from "../Global/Themed";

export const Header = () => {
  return (
    <View lightColor="#fff" darkColor="#181818" className="flex-col gap-y-4">
      <Text className="font-bold text-sm text-center pt-4 pr-4">
        Nuevo post
      </Text>
      <View
        style={{ height: 1, width: "100%" }}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};
