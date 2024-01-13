import React from "react";
import { PostHeader } from "./PostHeader";
import { TagsList } from "./TagsList";
import { Actions } from "./Actions";
import { PostContent } from "./PostContent";

export const Post = ({ data }) => {
  return (
    <div className="w-full duration-700 border-b flex flex-col gap-y-4">
      <PostHeader data={data} />
      <PostContent data={data}></PostContent>
      <TagsList data={data} />
      <Actions data={data} />
    </div>
  );
};
