import React from "react";
import { Preview } from "../Preview/Preview";

export const TendencyPosts = ({ posts }) => {
  return (
    <div className="flex flex-col gap-y-4">
      {posts.map((post) => (
        <Preview key={post.id} post={post} notSave={true} />
      ))}
    </div>
  );
};
