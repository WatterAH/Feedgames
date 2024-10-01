"use client";
import PageLoader from "@/components/Global/PageLoader";
import Post from "@/components/Post/Post";
import { useUser } from "@/context/AuthContext";
import { useFeed } from "@/hooks/useFeed";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
  const { user } = useUser();
  const { loading, posts, error, getPosts, allLoaded } = useFeed(user.id);

  return (
    <>
      {loading && (
        <main className="flex items-center justify-center h-screen lg:ml-64">
          <PageLoader />
        </main>
      )}
      {error && (
        <main className="flex items-center justify-center h-screen lg:ml-64">
          <h1>Error</h1>
        </main>
      )}
      {!loading && !error && (
        <main
          id="main"
          className="flex h-full w-full justify-center items-center"
        >
          <div className="w-full max-w-2xl">
            <div className="flex flex-col h-fit pb-14 lg:pb-0">
              <InfiniteScroll
                dataLength={posts.length}
                hasMore={!allLoaded}
                loader={<PageLoader />}
                next={getPosts}
              >
                {posts.map((post) => (
                  <Post data={post} key={post.id} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
