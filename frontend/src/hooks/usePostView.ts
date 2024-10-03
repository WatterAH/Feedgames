import { CommentInterface } from "@/interfaces/Comment";
import { PostInterface } from "@/interfaces/Post";
import { fetchComments } from "@/routes/comments";
import { getPostById } from "@/routes/post";
import { useCallback, useEffect, useState } from "react";

export const usePostView = (
  postId: string | undefined,
  userId: string | undefined
) => {
  const [post, setPost] = useState<PostInterface | null>();
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPost = useCallback(async () => {
    if (!postId || !userId) return;
    try {
      const data = await getPostById(postId, userId);
      setPost(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    }
  }, [postId, userId]);

  const getComments = useCallback(async () => {
    if (!postId || !userId) return;
    try {
      const data = await fetchComments(postId, userId);
      setComments(data);
    } catch (error: any) {
      setError(true);
      throw new Error(error.message);
    }
  }, [postId, userId]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPost(), getComments()]).then(() => setLoading(false));
  }, [getPost, getComments]);

  return { post, comments, loading, error };
};
