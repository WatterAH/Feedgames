"use client";

import Card from "@/components/Layout/Card";
import Error from "@/components/Layout/Error";
import PostContainer from "@/components/Layout/PostContainer";
import Title from "@/components/Layout/Title";
import { usePosts } from "@/hooks/usePosts";
import { PostsLoader } from "@/components/Layout/Loaders";
import { useUser } from "@/context/AuthContext";

const SavedPage = () => {
  const { user } = useUser();
  const { posts, loading, error, hasMore, getPosts } = usePosts(
    user.id,
    "saved",
  );

  const RenderContent = () => {
    if (loading) return <PostsLoader count={8} />;
    if (error) return <Error />;
    return <PostContainer posts={posts} hasMore={hasMore} getPost={getPosts} />;
  };

  return (
    <>
      <Title title="Guardado" />
      <Card />
      <div className="w-full max-w-2xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        <RenderContent />
      </div>
    </>
  );
};

export default SavedPage;
