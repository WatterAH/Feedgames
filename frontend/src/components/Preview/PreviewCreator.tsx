import React from "react";
import { PreviewDate } from "./PreviewDate";
import { PostInterface } from "../../interfaces/Post";

export const PreviewCreator = ({ post }: { post: PostInterface }) => {
  const { user } = post;
  const { username } = user;

  return (
    <header>
      <span className="flex gap-x-1">
        <div className="flex items-center gap-x-2">
          <p className="hover:underline text-gray-400 text-sm font-rubik">
            @{username}
          </p>
          <PreviewDate post={post} />
        </div>
      </span>
    </header>
  );
};
