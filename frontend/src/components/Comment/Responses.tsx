import React, { useEffect, useState } from "react";
import { CommentBox } from "./CommentBox";
import { fetchResponses, responseComment } from "../../api/comments";
import { LoadingPage } from "../LoadingPage";
import { Comment } from "./Comment";
import { toast } from "react-toastify";
import { useUser } from "../../Context/AuthContext";
import { CommentInterface } from "../../interfaces/Comment";

interface Props {
  commentId: string;
  id_post: string;
  id_user: string;
}

export const Responses: React.FC<Props> = ({ commentId, id_post, id_user }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<CommentInterface[]>([]);

  const handleResponsesViewer = async () => {
    try {
      setLoading(true);
      const responsesFetched = await fetchResponses(commentId, user.id);
      setResponses(responsesFetched);
    } catch (error: any) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleResponsesViewer();
  }, [commentId]);

  return (
    <div className="mb-24 lg:mb-0 flex flex-col gap-y-4 p-2">
      <h3 className="font-montserrat text-lg">Respuestas</h3>
      <CommentBox
        id_post={id_post}
        response={true}
        toNotify={id_user}
        setComments={setResponses}
        sendFunction={responseComment}
        comment_res={commentId}
      />
      <section className="flex flex-col gap-5">
        {loading ? (
          <LoadingPage />
        ) : responses.length == 0 ? (
          <p className="font-semibold text-gray-800">No hay respuestas.</p>
        ) : (
          <div className={`flex flex-col gap-y-5`}>
            {responses.map((comment, index) => (
              <Comment
                key={index}
                option={false}
                comment={comment}
                setComments={setResponses}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
