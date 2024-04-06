import React from "react";
import { View } from "../Global/Themed";
import { Image } from "react-native";

interface Props {
  image: string | null;
}

export const ContentPreview: React.FC<Props> = ({ image }) => {
  return (
    <View lightColor="#fff" darkColor="#181818" className="py-3">
      {image && (
        <Image source={{ uri: image }} className="w-full h-72 rounded-lg" />
      )}
    </View>
  );
};
