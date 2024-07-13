import React, { useState } from "react";
import { PostInterface } from "../../interfaces/Post";
import { Image, useColorScheme } from "react-native";
import { Text, View } from "../Global/Themed";
import { ImagesURL } from "@/constants/server";
import { ValPost } from "./ValMatch/ValPost";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = ({ data }) => {
  const { content, publicUrl, valMatch } = data;
  const [visible, setVisible] = useState(false);
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#202020" : "#eaeaea";
  const src = ImagesURL + publicUrl;

  return (
    <View className="flex-col pr-3" style={{ rowGap: 8 }}>
      {content && <Text>{content}</Text>}
      {publicUrl && (
        <View
          className="w-full h-54 aspect-square rounded-md"
          style={{ backgroundColor }}
        >
          <Image
            source={{ uri: src }}
            className="rounded-md cursor-pointer w-full h-54 aspect-square"
          />
        </View>
      )}
      {valMatch && <ValPost stats={valMatch} />}
    </View>
  );
};
