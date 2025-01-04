"use client";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import PostContainer from "@/layout/Pages/PostContainer";
import Title from "@/layout/Pages/Title";
import { useUser } from "@/context/AuthContext";
import { usePosts } from "@/hooks/usePosts";
import { PostsLoader } from "@/layout/Pages/Loaders";

export default function SavedPage() {
  const {
    user: { id },
  } = useUser();
  const { posts, loading, error, hasMore, getPosts } = usePosts(id, "saved");

  const RenderContent = () => {
    if (loading) return <PostsLoader count={8} />;
    if (error) return <Error />;
    return <PostContainer posts={posts} hasMore={hasMore} getPost={getPosts} />;
  };

  return (
    <>
      <Title title="Guardado" />
      <Card />
      <div className="w-full max-w-xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        <RenderContent />
      </div>
    </>
  );
}
