"use client";
import Title from "@/layout/Pages/Title";
import Card from "@/layout/Pages/Card";
import Error from "@/layout/Pages/Error";
import Comment from "@/components/Comments/Comment";
import { useUser } from "@/context/AuthContext";
import { useExploreResponse } from "@/hooks/useExplorer";
import { useParams } from "next/navigation";
import { PostsLoader } from "@/layout/Pages/Loaders";

export default function ResponsePage() {
  const { id } = useParams();
  const { user } = useUser();
  const { response, responses, loading, error, deleteComment } =
    useExploreResponse(user.id, id as string);

  const RenderContent = () => {
    if (loading) return <PostsLoader count={1} />;
    if (error || !response) return <Error />;
    return (
      <>
        <Comment data={response} deleteComment={deleteComment} />
        <h4 className="text-gray-500 px-3 border-b py-2">
          Respuestas
          <span className="font-semibold ml-1">{responses.length}</span>
        </h4>
        {responses.map((response) => (
          <Comment
            key={response.id}
            data={response}
            deleteComment={deleteComment}
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
