"use client";
import Card from "@/layout/Pages/Card";
import Title from "@/layout/Pages/Title";
import Error from "@/layout/Pages/Error";
import Header from "@/layout/Menu/Header";
import PostContainer from "@/layout/Pages/PostContainer";
import { useUser } from "@/context/AuthContext";
import { useRiotToken } from "@/hooks/useValorant";
import { usePosts } from "@/hooks/usePosts";
import { PostsLoader } from "@/layout/Pages/Loaders";

export default function HomePage() {
  useRiotToken();
  const {
    user: { id },
  } = useUser();
  const { posts, loading, error, hasMore, getPosts } = usePosts(id, "feed");

  const RenderContent = () => {
    if (loading) return <PostsLoader count={8} />;
    if (error && posts.length == 0) return <Error />;
    return <PostContainer posts={posts} hasMore={hasMore} getPost={getPosts} />;
  };

  return (
    <main className="flex flex-col h-screen justify-start items-center bg-barcelona relative">
      <Header />
      <Title title="Feed" />
      <Card />
      <div className="w-full max-w-2xl pt-16 md:pt-0 md:mt-[11vh] pb-14 lg:pb-0 z-10">
        <RenderContent />
      </div>
    </main>
  );
}
