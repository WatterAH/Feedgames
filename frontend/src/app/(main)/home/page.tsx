"use client";
import Card from "@/components/Global/Card";
import PageLoader from "@/components/Global/PageLoader";
import Post from "@/components/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "@/context/AuthContext";
import { useFeed } from "@/hooks/useFeed";

export default function HomePage() {
  const { user } = useUser();
  const { loading, posts, error, getPosts, allLoaded } = useFeed(user.id);

  return (
    <main className="flex flex-col lg:ml-20 h-screen justify-center items-center  bg-barcelona sm:pt-1 md:pt-4 gap-y-3 pb-14 lg:pb-0">
      <h3 className="font-semibold text-threads hidden md:block">Feed</h3>
      <Card loading={loading}>
        {loading && <PageLoader />}
        {error && <h1>Error</h1>}
        {!loading && !error && (
          <div id="scroll" className="overflow-y-auto scrollbar-none">
            <InfiniteScroll
              className="scrollbar-none"
              dataLength={posts.length}
              next={getPosts}
              hasMore={!allLoaded}
              loader={<PageLoader />}
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
