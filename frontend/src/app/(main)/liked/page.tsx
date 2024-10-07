"use client";
import Card from "@/components/Global/Card";
import PageLoader from "@/components/Global/PageLoader";
import PostsContainer from "@/components/Post/PostsContainer";
import { useUser } from "@/context/AuthContext";
import { usePosts } from "@/hooks/usePosts";

export default function LikedPage() {
  const { user } = useUser();
  const { posts, loading, error } = usePosts(user.id, "liked");
  return (
    <main className="flex flex-col h-screen justify-center items-center bg-barcelona sm:pt-1 md:pt-4 gap-y-3">
      <h3 className="font-semibold text-threads hidden md:block">
        Tus me gusta
      </h3>
      <Card loading={loading}>
        {loading && <PageLoader />}
        {error && <h1>error</h1>}
        {!loading && !error && <PostsContainer posts={posts} />}
      </Card>
    </main>
  );
}
