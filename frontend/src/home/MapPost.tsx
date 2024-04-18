import React from "react";
import { LoadingPage } from "../components/LoadingPage";
import { Post } from "../components/Post/Post";
import { PostInterface } from "../interfaces/Post";

interface Props {
  posts: PostInterface[];
  loading: boolean;
  setPosts: React.Dispatch<React.SetStateAction<PostInterface[]>>;
}

export const MapPost: React.FC<Props> = ({ posts, setPosts, loading }) => {
  return (
    <div className="flex justify-center h-fit dark:bg-black items-center p-6 flex-col gap-y-5 mb-10 lg:mb-0">
      {loading ? (
        <LoadingPage />
      ) : (
        posts.map((post) => (
          <Post key={post.id} data={post} setPosts={setPosts} />
        ))
      )}
    </div>
  );
};
