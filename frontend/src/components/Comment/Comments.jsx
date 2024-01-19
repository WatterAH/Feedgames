import React, { useEffect, useState } from "react";
import { CommentBox } from "./CommentBox";
import { Comment } from "./Comment";
import { LoadingPage } from "../LoadingPage";
import { useUser } from "../../context/AuthContext";

export const Comments = ({ data }) => {
  const { user } = useUser();
  const { parent_id, post_id, toNotify, response } = data;
  const { fetchFunction, sendFunction } = data;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchComments = async () => {
    try {
      setLoading(true);
      const commentsFetched = await fetchFunction(parent_id, user.id);
      setComments(commentsFetched);
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
    if (user.id) {
      handleFetchComments();
    }
  }, [parent_id, user.id]);

  return (
    <div className="mb-24 lg:mb-10 flex flex-col gap-y-4 p-2">
      <h3 className="font-montserrat text-lg">Comentarios</h3>
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
          <p className="font-semibold text-gray-800">No hay comentarios.</p>
        ) : (
          <div className={`flex flex-col gap-y-2`}>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                setComments={setComments}
                option={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
