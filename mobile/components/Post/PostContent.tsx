import React from "react";
import { PostInterface } from "../../interfaces/Post";
import { Image, View } from "react-native";
import { Text } from "../Global/Themed";
import { ImagesURL } from "@/constants/server.constant";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = ({ data }) => {
  let { content, publicUrl } = data;
  const src = ImagesURL + publicUrl;

  return (
    <View className="flex flex-col" style={{ rowGap: 16 }}>
      <Text className="text-sm w-fit">{content}</Text>
      {publicUrl && (
        <Image
          source={{ uri: src }}
          className="rounded-md cursor-pointer w-full h-fit"
          style={{ width: "100%", height: null, aspectRatio: 1 }}
        />
      )}
      {/* {valMatch && <MatchPost stats={valMatch} />} */}
    </View>
  );
};
