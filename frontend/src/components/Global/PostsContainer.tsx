import React from "react";
import { PostInterface } from "../../interfaces/Post";
import Post from "../Post/Post";

interface Props {
  posts: PostInterface[];
}

const PostsContainer: React.FC<Props> = ({ posts }) => {
  return (
    <div className="flex flex-col h-fit pb-14 lg:pb-0">
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsContainer;
