import React from "react";
import { View } from "../Global/Themed";
import { PostInterface } from "@/interfaces/Post";
import { FlatList } from "react-native";
import { Post } from "../Post/Post";

interface Props {
  posts: PostInterface[];
}

export const ProfilePosts: React.FC<Props> = ({ posts }) => {
  return posts.map((post) => <Post data={post} key={post.id} />);
};
