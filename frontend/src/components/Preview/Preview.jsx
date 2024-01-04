import React from "react";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewContent } from "./PreviewContent";
import { PreviewDate } from "./PreviewDate";
import { PreviewName } from "./PreviewName";

export const Preview = ({ post, userID, notSave, setPosts }) => {
  return (
    <div className="border font-montserrat w-78 flex gap-y-3 flex-col rounded-md shadow-sm px-4 py-2 dark:text-white h-40">
      <PreviewHeader
        post={post}
        userID={userID}
        notSave={notSave}
        setPosts={setPosts}
      />
      <PreviewContent post={post} />
      <section className="flex mt-auto items-end justify-between text-xs text-gray-400">
        <PreviewDate post={post} />
        <PreviewName post={post} />
      </section>
    </div>
  );
};
