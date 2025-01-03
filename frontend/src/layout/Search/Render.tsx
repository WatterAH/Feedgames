import React from "react";
import Post from "@/components/Post/Post";
import Loader from "@/components/Global/Loader";
import Result from "./Result";
import SearchCurrent from "./SearchCurrent";
import { User } from "@/interfaces/User";
import { PostInterface } from "@/interfaces/Post";

interface PostsProps {
  loading: boolean;
  posts: PostInterface[];
}

export const RenderPosts: React.FC<PostsProps> = ({ loading, posts }) => {
  return loading ? (
    <div className="h-[65vh] flex items-center justify-center">
      <Loader color="dark" size="large" />
    </div>
  ) : (
    posts.map((post) => <Post data={post} key={post.id} />)
  );
};

interface UserProps {
  loading: boolean;
  users: User[];
  searchTerm: string;
  setCurrent: (curretn: string) => void;
}

export const RenderUsers: React.FC<UserProps> = ({
  loading,
  users,
  setCurrent,
  searchTerm,
}) => {
  return loading ? (
    <div className="h-[65vh] flex items-center justify-center">
      <Loader color="dark" size="large" />
    </div>
  ) : (
    <div className="flex flex-col py-3">
      <SearchCurrent setCurrent={setCurrent} searchTerm={searchTerm} />
      {users.map((user) => (
        <Result key={user.id} {...user} />
      ))}
    </div>
  );
};
