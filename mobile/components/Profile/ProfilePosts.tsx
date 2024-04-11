import React from "react";
import { PostInterface } from "@/interfaces/Post";
import { Post } from "../Post/Post";

interface Props {
  posts: PostInterface[];
}

export const ProfilePosts: React.FC<Props> = ({ posts }) => {
  return posts.map((post) => <Post data={post} key={post.id} />);
};
