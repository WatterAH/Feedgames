"use client";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import Title from "@/layout/Pages/Title";
import PostContainer from "@/layout/Pages/PostContainer";
import { useUser } from "@/context/AuthContext";
import { usePosts } from "@/hooks/usePosts";
import { PostsLoader } from "@/layout/Pages/Loaders";

export default function LikedPage() {
  const {
    user: { id },
  } = useUser();
  const { posts, loading, error, getPosts, hasMore } = usePosts(id, "liked");

  const RenderContent = () => {
    if (loading) return <PostsLoader count={8} />;
    if (error) return <Error />;
    return <PostContainer posts={posts} hasMore={hasMore} getPost={getPosts} />;
  };

  return (
    <main className="flex flex-col h-screen items-center bg-barcelona dark:bg-coal relative">
      <Title title="Te gusta" />
      <Card />
      <div className="w-full max-w-2xl md:mt-[11vh] pb-14 lg:pb-0 z-10">
        <RenderContent />
      </div>
    </main>
  );
}
