import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { View } from "../Global/Themed";

interface Props {
  data: PostInterface;
}

export const Post: React.FC<Props> = ({ data }) => {
  return (
    <View
      className="w-full duration-700 border-b border-gray-100 dark:border-neutral-800 flex-col py-5 px-3"
      style={{ rowGap: 16 }}
    >
      <PostHeader data={data} />
      <PostContent data={data} />
      <PostActions data={data} />
    </View>
  );
};
