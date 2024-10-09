"use client";
import Card from "@/components/Global/Card";
import Post from "@/components/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "@/components/Menu/Header";
import Loader from "@/components/Global/Loader";
import { useFeed } from "@/hooks/useFeed";
import { useUser } from "@/context/AuthContext";
import { useRiotToken } from "@/hooks/useValorant";

export default function HomePage() {
  const { user } = useUser();
  const { loading, posts, error, getPosts, allLoaded } = useFeed(user.id);
  useRiotToken();

  return (
    <main className="flex flex-col h-screen justify-center items-center bg-barcelona sm:pt-1 md:pt-4 gap-y-3 relative">
      <Header />
      <h3 className="font-semibold text-threads hidden md:block">Feed</h3>
      <Card loading={loading}>
        {loading && <Loader size="large" color="dark" />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <div
            id="scroll"
            className="overflow-y-auto scrollbar-none pt-16 md:pt-0 pb-14 lg:pb-0"
          >
            <InfiniteScroll
              className="scrollbar-none"
              dataLength={posts.length}
              next={getPosts}
              hasMore={!allLoaded}
              loader={<Loader size="large" color="dark" />}
              scrollableTarget={"scroll"}
            >
              {posts.map((post) => (
                <Post data={post} key={post.id} />
              ))}
            </InfiniteScroll>
          </div>
        )}
      </Card>
    </main>
  );
}
