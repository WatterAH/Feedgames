import React from "react";
import Post from "@/components/Post/Post";
import Empty from "./Empty";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostInterface } from "@/interfaces/Post";
import { PostsLoader } from "./Loaders";

interface Props {
  posts: PostInterface[];
  getPost: () => void;
  hasMore: boolean;
}

const PostContainer: React.FC<Props> = ({ posts, hasMore, getPost }) => {
  return posts.length != 0 ? (
    <InfiniteScroll
      className="mt-1"
      dataLength={posts.length}
      hasMore={hasMore}
      loader={<PostsLoader count={2} />}
      next={getPost}
    >
      {posts.map((post, i) => (
        <Post data={post} key={post.id} isLast={i == posts.length - 1} />
      ))}
    </InfiniteScroll>
  ) : (
    <Empty text="Parece que no hay posts..." />
  );
};

export default PostContainer;
