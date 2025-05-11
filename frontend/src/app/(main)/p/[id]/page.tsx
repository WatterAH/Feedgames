"use client";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import Post from "@/components/Post/Post";
import PostContainer from "@/layout/Pages/PostContainer";
import { useUser } from "@/context/AuthContext";
import { useFetchPost, useExploreResponses } from "@/hooks/useExplorer";
import { useParams } from "next/navigation";
import { PostsLoader } from "@/layout/Pages/Loaders";
import { usePostVisualizer } from "@/context/PostVisualizerContext";

export default function PostPage() {
  const { id } = useParams();
  const { user } = useUser();
  const { post } = usePostVisualizer();
  const { fetchedPost } = useFetchPost(
    id as string,
    user.id,
    post ? false : true
  );

  const { getResponses, responses, error, loading } = useExploreResponses(
    user.id,
    id as string
  );

  const RenderContent = () => {
    if (error || (!post && !fetchedPost)) return <Error />;
    return (
      <>
        <Post data={(post ?? fetchedPost)!} />
        <h4 className="text-placeholder px-3 border-b border-border py-2">
          Comentarios
          <span className="font-semibold ml-1">{responses.length}</span>
        </h4>
        {loading && responses.length == 0 ? (
          <PostsLoader count={1} />
        ) : (
          <PostContainer
            getPost={getResponses}
            posts={responses}
            hasMore={false}
          />
        )}
      </>
    );
  };

  return (
    <>
      <Title title="Post" />
      <Card />
      <div className="w-full max-w-2xl py-14 md:pt-0 md:mt-[11vh] lg:pb-0 z-10">
        <RenderContent />
      </div>
    </>
  );
}
