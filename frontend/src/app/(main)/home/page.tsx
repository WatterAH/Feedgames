"use client";
import Card from "@/layout/Pages/Card";
import Title from "@/layout/Pages/Title";
import Error from "@/layout/Pages/Error";
import Header from "@/layout/Menu/Header";
import PostContainer from "@/layout/Pages/PostContainer";
import { useUser } from "@/context/AuthContext";
import { useRiotToken } from "@/hooks/useValorant";
import { PostsLoader } from "@/layout/Pages/Loaders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "@/store/feedSlice";

export default function HomePage() {
  useRiotToken();
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();
  const { posts, loading, error, hasMore } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    if (user?.id && posts.length < 10) {
      dispatch(fetchPosts(user.id, 10));
    }
  }, [dispatch, user?.id, posts.length]);

  const getMorePosts = () => {
    if (hasMore && !loading && user?.id) {
      dispatch(fetchPosts(user.id, 10));
    }
  };

  const RenderContent = () => {
    if (loading && posts.length == 0) return <PostsLoader count={8} />;
    if (error && posts.length == 0) return <Error />;
    return (
      <PostContainer posts={posts} hasMore={hasMore} getPost={getMorePosts} />
    );
  };

  return (
    <main className="flex flex-col h-screen justify-start items-center bg-barcelona dark:bg-coal relative">
      <Header />
      <Title title="Feed" />
      <Card />
      <div className="w-full max-w-2xl pt-16 md:pt-0 md:mt-[11vh] pb-14 lg:pb-0 z-10">
        <RenderContent />
      </div>
    </main>
  );
}
