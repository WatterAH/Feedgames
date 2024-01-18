import React from "react";
import { LoadingPage } from "../components/LoadingPage";
import { Post } from "../components/Post/Post";

export const MapPost = ({ posts, loading }) => {
  return (
    <div className="flex justify-center h-fit items-center p-6 flex-col gap-y-5 mb-10 lg:mb-0">
      {loading ? (
        <LoadingPage />
      ) : (
        posts.map((post) => <Post key={post.id} data={post} />)
      )}
    </div>
  );
};
