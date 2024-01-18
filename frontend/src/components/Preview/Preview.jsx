import React from "react";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewContent } from "./PreviewContent";
import { Link } from "react-router-dom";

export const Preview = ({ post, userID, notSave, setPosts }) => {
  const { id } = post;
  return (
    <Link to={`/post/${id}`}>
      <div className="font-montserrat w-full h-32 border flex flex-col rounded-md shadow-sm px-3 py-2 gap-y-1">
        <PreviewHeader
          post={post}
          userID={userID}
          notSave={notSave}
          setPosts={setPosts}
        />
        <PreviewContent post={post} />
      </div>
    </Link>
  );
};
