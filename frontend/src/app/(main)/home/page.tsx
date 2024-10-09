"use client";
import Card from "@/components/Global/Card";
import Post from "@/components/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "@/components/Menu/Header";
import Loader from "@/components/Global/Loader";
import { useFeed } from "@/hooks/useFeed";
import { useUser } from "@/context/AuthContext";
import { useRiotToken } from "@/hooks/useValorant";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user } = useUser();
  const { loading, posts, error, getPosts, allLoaded } = useFeed(user.id);
  const [scrollableTarget, setScrollableTarget] = useState("");
  useRiotToken();

  useEffect(() => {
    const updateScrollableTarget = () => {
      if (window.innerWidth >= 1024) {
        setScrollableTarget("scr");
      } else {
        setScrollableTarget("");
      }
    };
    updateScrollableTarget();
    window.addEventListener("resize", updateScrollableTarget);

    return () => {
      window.removeEventListener("resize", updateScrollableTarget);
    };
  }, []);

  return (
    <main className="flex flex-col h-screen justify-center items-center bg-barcelona sm:pt-1 gap-y-3 relative scrollbar-thin">
      <Header />
      <h3 className="font-semibold text-threads hidden md:block">Feed</h3>
      <Card loading={loading}>
        {loading && <Loader size="large" color="dark" />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <div
            id="scr"
            className="lg:overflow-auto scrollbar-none pt-16 md:pt-0 pb-14 lg:pb-0"
          >
            <InfiniteScroll
              className="scrollbar-none"
              dataLength={posts.length}
              next={getPosts}
              hasMore={!allLoaded}
              scrollableTarget={scrollableTarget}
              loader={
                <div className="py-2">
                  <Loader size="large" color="dark" />
                </div>
              }
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
