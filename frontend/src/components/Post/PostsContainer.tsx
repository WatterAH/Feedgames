import React from "react";
import Post from "../Post/Post";
import { PostInterface } from "@/interfaces/Post";

interface Props {
  posts: PostInterface[];
}

const PostsContainer: React.FC<Props> = ({ posts }) => {
  return (
    <div className="flex flex-col h-fit pb-14 lg:pb-0 overflow-y-auto">
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsContainer;
