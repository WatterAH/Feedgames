import React from "react";
import { Image } from "react-native";
import { View } from "../Global/Themed";
import { PfpURL } from "@/constants/server";

interface Props {
  src: string | undefined;
  h: string;
  w: string;
}

export const ProfilePicture: React.FC<Props> = ({ src, h, w }) => {
  const href = PfpURL + src;

  return (
    <View
      lightColor="#eaeaea"
      darkColor="#202020"
      className={`${w} ${h} rounded-full`}
    >
      <Image
        source={
          src ? { uri: href } : require("../../assets/images/default.png")
        }
        className={`rounded-full ${w} ${h} cursor-pointer flex items-center justify-center`}
      />
    </View>
  );
};
