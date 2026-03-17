"use client";

import React, { useEffect } from "react";
import Error from "@/components/Layout/Error";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import PostContainer from "@/components/Layout/PostContainer";
import Title from "@/components/Layout/Title";
import Card from "@/components/Layout/Card";
import { useUser } from "@/context/AuthContext";
import { fetchPosts, fetchUserSuccess } from "@/store/userSlice";
import { ProfileLoader } from "@/components/Layout/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/interfaces/User";

interface Props extends User {
  error?: boolean;
}

const MyPage: React.FC<Props> = ({ error, ...data }) => {
  const { user: userSession } = useUser();
  const { user, posts, loadingPosts, errorPosts, hasMore } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(fetchUserSuccess({ user: data }));
    }
  }, []);

  useEffect(() => {
    if (posts.length == 0) {
      dispatch(fetchPosts(userSession.id, 10));
    }
  }, [dispatch, userSession?.id, posts.length]);

  const getMorePosts = () => {
    if (hasMore && userSession?.id) {
      dispatch(fetchPosts(userSession.id, 10));
    }
  };

  return (
    <>
      <Title title={user?.username || "Perfil"} />
      <Card />
      <div className="w-full max-w-2xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        {loadingPosts && <ProfileLoader />}
        {errorPosts && <Error />}
        {user && <ProfileHeader data={data} />}

        <PostContainer posts={posts} getPost={getMorePosts} hasMore={hasMore} />
      </div>
    </>
  );
};

export default MyPage;
