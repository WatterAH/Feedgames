"use client";
import Card from "@/components/Global/Card";
import PageLoader from "@/components/Global/PageLoader";
import PostsContainer from "@/components/Post/PostsContainer";
import { useUser } from "@/context/AuthContext";
import { usePosts } from "@/hooks/usePosts";
import { Search } from "lucide-react";

export default function SearchPage() {
  const { user } = useUser();
  const { posts, loading, error } = usePosts(user.id, "tendency");

  return (
    <main className="flex flex-col h-screen justify-center items-center  bg-barcelona sm:pt-1 md:pt-4 gap-y-3 pb-14 lg:pb-0">
      <h1 className="font-semibold text-threads hidden md:block">Buscar</h1>
      <Card loading={loading}>
        {loading && <PageLoader />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <div className="overflow-y-auto scrollbar-none pt-5">
            <header className="w-full px-5 space-y-3 mb-3">
              <div className="relative">
                <Search className="text-icon h-5 absolute top-4 left-3" />
                <input
                  type="text"
                  className="p-4 font-montserrat text-base sm:text-sm pl-12 outline-none border rounded-2xl w-full bg-barcelona placeholder-icon text-threads"
                  placeholder="Busca personas, posts..."
                />
              </div>
              <h4 className="text-gray-500 px-2">En tendencia</h4>
            </header>
            <PostsContainer posts={posts} />
          </div>
        )}
      </Card>
    </main>
  );
}
