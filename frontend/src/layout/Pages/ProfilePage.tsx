"use client";

import React from "react";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import { User } from "@/interfaces/User";
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/context/AuthContext";
import PostContainer from "./PostContainer";
import ProfileHeader from "@/components/Profile/ProfileHeader";

interface Props extends User {
  error?: boolean;
}

const ProfilePage: React.FC<Props> = ({ error, ...data }) => {
  const { user } = useUser();
  const posts = usePosts(data.id, "user", user.id);

  return (
    <>
      <Title title={data.username} />
      <Card />
      <div className="w-full max-w-2xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        {error ? (
          <Error />
        ) : (
          <>
            <ProfileHeader data={data} />
            <PostContainer
              posts={posts.posts}
              getPost={posts.getPosts}
              hasMore={posts.hasMore}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
