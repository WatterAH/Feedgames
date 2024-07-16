import React, { useEffect } from "react";
import { ImagesURL } from "@/constants/server";
import { Image } from "react-native";
import { View } from "@/components/Global/Themed";

interface Props {
  publicUrl: string;
}

export const PostImage: React.FC<Props> = React.memo(({ publicUrl }) => {
  const src = ImagesURL + publicUrl;

  useEffect(() => {
    Image.prefetch(src);
  }, []);

  return (
    <View
      darkColor="#202020"
      lightColor="#eaeaea"
      className="w-full h-54 aspect-square rounded-md"
    >
      <Image
        source={{ uri: src }}
        className="rounded-md cursor-pointer w-full h-54 aspect-square"
      />
    </View>
  );
});
