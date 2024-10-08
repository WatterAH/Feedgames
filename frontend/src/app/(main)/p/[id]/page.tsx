"use client";
import Comment from "@/components/Comments/Comment";
import Card from "@/components/Global/Card";
import Error from "@/components/Global/Error";
import Loader from "@/components/Global/Loader";
import Post from "@/components/Post/Post";
import { useUser } from "@/context/AuthContext";
import { useExplorePost } from "@/hooks/useExplorer";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { id } = useParams();
  const { user } = useUser();
  const { post, loading, comments, error } = useExplorePost(
    id as string,
    user.id
  );

  return (
    <main className="flex flex-col h-screen justify-center items-center bg-barcelona sm:pt-1 md:pt-4 gap-y-3">
      <h3 className="font-semibold text-threads hidden md:block">Post</h3>
      <Card loading={loading}>
        {loading && <Loader size="large" color="dark" />}
        {error && !post && <Error item="Post" />}
        {!loading && !error && post && (
          <div className="flex flex-col pb-14 lg:pt-0">
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
