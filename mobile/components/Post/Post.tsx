import React from "react";
import { View } from "react-native";
import { PostInterface } from "@/interfaces/Post";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";

interface Props {
  data: PostInterface;
}

const Post: React.FC<Props> = ({ data }) => {
  return (
    <View
      className="w-full duration-700 border-b border-gray-100 dark:border-neutral-800 flex flex-col py-5"
      style={{ rowGap: 16 }}
    >
      <PostHeader data={data} />
      <PostContent data={data} />
      <PostActions data={data} />
    </View>
  );
};

export default Post;
