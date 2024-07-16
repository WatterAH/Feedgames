import React from "react";
import { PostInterface } from "../../interfaces/Post";
import { Text, View } from "../Global/Themed";
import { ValPost } from "./Contents/ValPost";
import { PostImage } from "./Contents/PostImage";

interface Props {
  data: PostInterface;
}

export const PostContent: React.FC<Props> = React.memo(({ data }) => {
  const { content, publicUrl, valMatch } = data;

  return (
    <View className="flex-col pr-3" style={{ rowGap: 8 }}>
      {content && <Text>{content}</Text>}
      {publicUrl && <PostImage publicUrl={publicUrl} />}
      {valMatch && <ValPost stats={valMatch} />}
    </View>
  );
});
