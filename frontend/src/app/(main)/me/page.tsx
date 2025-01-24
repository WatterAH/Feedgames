"use client";
import Error from "@/layout/Pages/Error";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import PostContainer from "@/layout/Pages/PostContainer";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import { useUser } from "@/context/AuthContext";
import { useEffect } from "react";
import { fetchPosts } from "@/store/userSlice";
import { ProfileLoader } from "@/layout/Pages/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function MyProfile() {
  const { user: userSession } = useUser();
  const {
    user,
    errorUser,
    posts,
    loadingUser,
    loadingPosts,
    errorPosts,
    hasMore,
  } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

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
        {(loadingUser || loadingPosts) && <ProfileLoader />}
        {(errorUser || errorPosts) && <Error />}
        {user && <ProfileHeader data={user} />}
        {user && (
          <PostContainer
            posts={posts}
            getPost={getMorePosts}
            hasMore={hasMore}
          />
        )}
      </div>
    </>
  );
}
