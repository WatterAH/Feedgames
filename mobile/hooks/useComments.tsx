import { fetchComments, fetchResponses } from "@/api/comments";
import { useSession } from "@/context/ctx";
import { CommentInterface } from "@/interfaces/Comment";
import { useCallback, useState } from "react";

export const useComments = (parentId: string, type: "comms" | "res") => {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CommentInterface[]>();

  const getComments = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data =
        type == "comms"
          ? await fetchComments(parentId, user.id)
          : await fetchResponses(parentId, user.id);
      setComments(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [parentId, user?.id]);

  return { loading, comments, getComments };
};
