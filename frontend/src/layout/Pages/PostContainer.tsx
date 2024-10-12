import React from "react";
import Post from "@/components/Post/Post";
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
      dataLength={posts.length}
      hasMore={hasMore}
      loader={<PostsLoader count={2} />}
      next={getPost}
    >
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </InfiniteScroll>
  ) : (
    <p className="text-secondaryicon text-center py-3">
      Parece que no hay posts...
    </p>
  );
};

export default PostContainer;
