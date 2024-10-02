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
        <main className="flex items-center justify-center h-screen lg:ml-20 bg-barcelona">
          <PageLoader />
        </main>
      )}
      {error && (
        <main className="flex items-center justify-center h-screen bg-barcelona">
          <h1>Error</h1>
        </main>
      )}
      {!loading && !error && (
        <main className="flex flex-col lg:ml-20 h-screen justify-center items-center sm:pt-3 lg:pt-4 bg-barcelona gap-y-4">
          <h3 className="font-semibold">Feed</h3>
          <div className="flex flex-col lg:pt-2 bg-white sm:rounded-t-3xl sm:shadow-md border h-screen max-w-2xl w-full overflow-y-auto scrollbar-none">
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
        </main>
      )}
    </>
  );
}
