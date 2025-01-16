"use client";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import Post from "@/components/Post/Post";
import { useUser } from "@/context/AuthContext";
import { useExplorePost } from "@/hooks/useExplorer";
import { useParams } from "next/navigation";
import { PostsLoader } from "@/layout/Pages/Loaders";

export default function PostPage() {
  const { id } = useParams();
  const { user } = useUser();
  const { post, loading, responses, error } = useExplorePost(
    id as string,
    user.id
  );

  const RenderContent = () => {
    if (loading) return <PostsLoader count={1} />;
    if (error || !post) return <Error />;
    return (
      <>
        <Post data={post} />
        <h4 className="text-gray-500 px-3 border-b border-border py-2">
          Comentarios
          <span className="font-semibold ml-1">{responses.length}</span>
        </h4>
        {responses.map((response, i) => (
          <Post
            key={response.id}
            data={response}
            isLast={i == responses.length - 1}
          />
        ))}
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
