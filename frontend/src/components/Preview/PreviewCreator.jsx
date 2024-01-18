import React from "react";
import { Link } from "react-router-dom";

import { PreviewDate } from "./PreviewDate";

export const PreviewCreator = ({ post }) => {
  const { user_id, user } = post;
  const { username } = user;

  return (
    <header>
      <span className="flex gap-x-1">
        <Link to={`/profile/${user_id}`} className="flex items-center gap-x-2">
          <p className="hover:underline text-gray-400 text-sm font-rubik">
            @{username}
          </p>
          <PreviewDate post={post} />
        </Link>
      </span>
    </header>
  );
};
