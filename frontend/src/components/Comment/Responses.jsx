import React, { useEffect, useState } from "react";
import { CommentBox } from "./CommentBox";
import { fetchResponses } from "../../Api/comments";
import { LoadingPage } from "../LoadingPage";
import { Comment } from "./Comment";

export const Responses = ({ commentId, id_post, id_user }) => {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  const handleResponsesViewer = async () => {
    try {
      setLoading(true);
      const responsesFetched = await fetchResponses(commentId);
      setResponses(responsesFetched);
    } catch (error) {
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
        setComments={setResponses}
        id_post={id_post}
        response={true}
        id_responsed={commentId}
        id_user_responsed={id_user}
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
