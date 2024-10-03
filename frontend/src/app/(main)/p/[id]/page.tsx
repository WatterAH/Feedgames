"use client";
import Comment from "@/components/Comments/Comment";
import Card from "@/components/Global/Card";
import PageLoader from "@/components/Global/PageLoader";
import Post from "@/components/Post/Post";
import { useUser } from "@/context/AuthContext";
import { usePostView } from "@/hooks/usePostView";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { id } = useParams();
  const { user } = useUser();
  const { post, loading, comments, error } = usePostView(id as string, user.id);

  return (
    <main className="flex flex-col lg:ml-20 h-screen justify-center items-center  bg-barcelona sm:pt-1 md:pt-4 gap-y-3">
      <h3 className="font-semibold text-threads hidden md:block">Post</h3>
      <Card loading={loading}>
        {loading && <PageLoader />}
        {error && <h1>Error</h1>}
        {!loading && !error && post && (
          <div className="flex flex-col pt-2">
            <Post data={post} />
            <h4 className="text-gray-500 px-3 border-b py-2">
              Comentarios
              <span className="font-semibold ml-1">{post.comments}</span>
            </h4>
            {comments.map((comment) => (
              <Comment key={comment.id} data={comment} />
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
