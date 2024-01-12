import React from "react";
import { PostHeader } from "./PostHeader";
import { TagsList } from "./TagsList";
import { Actions } from "./Actions";
import { PostContent } from "./PostContent";
import { Link } from "react-router-dom";

export const Post = ({ data }) => {
  const { id } = data;
  return (
    <div className="w-full duration-700 p-6 shadow-sm border rounded-lg flex flex-col gap-y-4 hover:border-gray-300 hover:cursor-pointer">
      <Link to={`/post/${id}`}>
        <PostHeader data={data} />
      </Link>
      <PostContent data={data}></PostContent>
      <TagsList data={data} />
      <Actions data={data} />
    </div>
  );
};
