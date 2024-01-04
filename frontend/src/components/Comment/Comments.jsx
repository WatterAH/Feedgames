import React, { useEffect, useState } from "react";
import { CommentBox } from "./CommentBox";
import { toast } from "react-toastify";
import { LoadingPage } from "../LoadingPage";
import { fetchComments } from "../../Api/comments";
import { Comment } from "./Comment";

export let userResponse;
export let id_comment;
export let force;

export const Comments = ({ post_id, post_user }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCommentsViewer = async () => {
    try {
      setLoading(true);
      const commentsFetched = await fetchComments(post_id);
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
    handleCommentsViewer();
  }, [post_id]);

  return (
    <div className="mb-24 lg:mb-0 flex flex-col gap-y-4 p-2">
      <h3 className="font-montserrat text-lg">Comentarios</h3>
      <CommentBox
        id_post={post_id}
        response={false}
        setComments={setComments}
        user_post={post_user}
      />
      <section className="flex flex-col gap-5">
        {loading ? (
          <LoadingPage />
        ) : comments.length == 0 ? (
          <p className="font-semibold text-gray-800">No hay comentarios.</p>
        ) : (
          <div className={`flex flex-col gap-y-5`}>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                setComments={setComments}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
