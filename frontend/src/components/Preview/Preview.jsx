import React from "react";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewContent } from "./PreviewContent";
import { PreviewDate } from "./PreviewDate";
import { PreviewName } from "./PreviewName";
import { Link } from "react-router-dom";

export const Preview = ({ post, userID, notSave, setPosts }) => {
  const { id } = post;
  return (
    <div className="border font-montserrat w-78 flex gap-y-3 flex-col rounded-md shadow-sm px-4 py-2 h-40 hover:border-gray-300 duration-700 hover:cursor-pointer">
      <PreviewHeader
        post={post}
        userID={userID}
        notSave={notSave}
        setPosts={setPosts}
      />
      <Link to={`/post/${id}`}>
        <PreviewContent post={post} />
      </Link>
      <section className="flex mt-auto items-end justify-between text-xs text-gray-400">
        <PreviewDate post={post} />
      </section>
    </div>
  );
};
