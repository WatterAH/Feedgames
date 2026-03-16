"use client";

import React from "react";
import Title from "@/components/Layout/Title";
import Card from "@/components/Layout/Card";
import Post from "@/components/Post/Post";
import Error from "./Error";
import PostContainer from "@/components/Layout/PostContainer";
import { PostInterface } from "@/interfaces/Post";
import { PostsLoader } from "./Loaders";
import { useExploreResponses } from "@/hooks/useExplorer";
import { useUser } from "@/context/AuthContext";

interface Props extends PostInterface {
  error?: boolean;
}

const PostPage: React.FC<Props> = ({ error = false, ...data }) => {
  const { user } = useUser();
  const responses = useExploreResponses(user.id, data.id);

  return (
    <>
      <Title title="Post" />
      <Card />
      <div className="w-full max-w-2xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        {error ? (
          <Error />
        ) : (
          <>
            <Post data={data} />
            <h4 className="text-placeholder px-3 border-b border-border py-2">
              Comentarios
              <span className="font-semibold ml-1">
                {responses.data.length}
              </span>
            </h4>
            {responses.loading && responses.data.length == 0 ? (
              <PostsLoader count={1} />
            ) : (
              <PostContainer
                getPost={responses.getResponses}
                posts={responses.data}
                hasMore={false}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PostPage;
