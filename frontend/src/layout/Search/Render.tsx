import React from "react";
import Post from "@/components/Post/Post";
import Loader from "@/components/Global/Loader";
import Result from "./Result";
import { User } from "@/interfaces/User";
import { PostInterface } from "@/interfaces/Post";
import Empty from "../Pages/Empty";

interface PostsProps {
  loading: boolean;
  posts: PostInterface[];
}

export const RenderPosts: React.FC<PostsProps> = ({ loading, posts }) => {
  return loading ? (
    <div className="h-[65vh] flex items-center justify-center">
      <Loader color="dark" size="large" />
    </div>
  ) : posts.length != 0 ? (
    posts.map((post) => <Post data={post} key={post.id} />)
  ) : (
    <Empty full text="Ningún resultado coincide con la busqueda" />
  );
};

interface UserProps {
  loading: boolean;
  users: User[];
}

export const RenderUsers: React.FC<UserProps> = ({ loading, users }) => {
  return loading ? (
    <div className="h-[65vh] flex items-center justify-center">
      <Loader color="dark" size="large" />
    </div>
  ) : (
    <div className="flex flex-col py-3">
      {users.map((user) => (
        <Result key={user.id} data={user} />
      ))}
    </div>
  );
};
