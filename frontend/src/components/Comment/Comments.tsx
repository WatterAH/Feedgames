import React, { useEffect, useState } from "react";
import { CommentBox } from "./CommentBox";
import { Comment } from "./Comment";
import { LoadingPage } from "../LoadingPage";
import { useUser } from "../../context/AuthContext";
import { CommentInterface } from "../../interfaces/Comment";
import { toast } from "sonner";

interface dataInterface {
  parent_id: string;
  post_id: string;
  toNotify: string;
  response: boolean;
  fetchFunction: (
    parent_id: string,
    user_id: string
  ) => Promise<CommentInterface[]>;
  sendFunction: (body: object) => Promise<CommentInterface>;
}

export const Comments = ({ data }: { data: dataInterface }) => {
  const { user } = useUser();
  const { parent_id, post_id, toNotify, response } = data;
  const { fetchFunction, sendFunction } = data;
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchComments = async () => {
    try {
      setLoading(true);
      const commentsFetched = await fetchFunction(parent_id, user.id);
      setComments(commentsFetched);
    } catch (error: any) {
      const { message } = error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      handleFetchComments();
    }
  }, [parent_id, user.id]);

  return (
    <div className="mb-24 lg:mb-10 dark:bg-black flex flex-col gap-y-4 p-2">
      <h3 className="font-montserrat text-lg dark:text-white">Comentarios</h3>
      <CommentBox
        id_post={post_id}
        response={response}
        toNotify={toNotify}
        setComments={setComments}
        sendFunction={sendFunction}
        comment_res={parent_id}
      />
      <section className="flex flex-col gap-5">
        {loading ? (
          <LoadingPage />
        ) : comments.length == 0 ? (
          <p className="font-semibold text-gray-800 dark:text-white">
            No hay comentarios.
          </p>
        ) : (
          <div className={`flex flex-col gap-y-2`}>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                setComments={setComments}
                hasDelete={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
