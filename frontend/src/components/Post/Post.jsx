import React from "react";
import { PostHeader } from "./PostHeader";
import { TagsList } from "./TagsList";
import { Actions } from "./Actions";
import { PostContent } from "./PostContent";

export const Post = ({ data }) => {
  return (
    <div className="w-full dark:text-white duration-500 p-6 shadow-sm dark:border-neutral-700 border rounded-lg flex flex-col gap-y-5">
      <PostHeader data={data} />
      <PostContent data={data}></PostContent>
      <TagsList data={data} />
      <Actions data={data} />
    </div>
  );
};
