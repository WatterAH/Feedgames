"use client";
import Error from "@/layout/Pages/Error";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import PostContainer from "@/layout/Pages/PostContainer";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import { useUser } from "@/context/AuthContext";
import { useEffect } from "react";
import { fetchPosts, fetchUser } from "@/store/userSlice";
import { ProfileLoader } from "@/layout/Pages/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function MyProfile() {
  const { user: userSession } = useUser();
  const { user, loadingUser, errorUser, posts, errorPosts, hasMore } =
    useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(userSession?.id));
      dispatch(fetchPosts(userSession.id, 10));
    }
  }, [dispatch, userSession?.id, posts.length, user]);

  const getMorePosts = () => {
    if (hasMore && !loadingUser && userSession?.id) {
      dispatch(fetchPosts(userSession.id, 10));
    }
  };

  return (
    <main
      id="main"
      className="flex flex-col h-screen items-center bg-barcelona relative overflow-y-scroll"
    >
      <Title title={userSession.username} />
      <Card />
      <div className="w-full max-w-2xl md:mt-[10vh] pb-14 lg:pb-0 z-10">
        {loadingUser && <ProfileLoader />}
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
    </main>
  );
}
