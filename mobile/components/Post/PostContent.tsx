import React from "react";
import { PostInterface } from "../../interfaces/Post";
import { Image, useColorScheme } from "react-native";
import { View } from "../Global/Themed";
import { ImagesURL } from "@/constants/server.constant";
import Markdown from "react-native-markdown-display";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = ({ data }) => {
  let { content, publicUrl } = data;
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#202020" : "#b5b5b5";
  const textColor = colorScheme === "dark" ? "#fff" : "#000";
  const src = ImagesURL + publicUrl;

  return (
    <View className="flex-col" style={{ rowGap: 16 }}>
      {content && (
        <Markdown style={{ body: { color: textColor } }}>{content}</Markdown>
      )}
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
      {/* {valMatch && <MatchPost stats={valMatch} />} */}
    </View>
  );
};
