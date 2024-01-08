import React, { useState } from "react";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { SaveButton } from "./SaveButton";
import { ShareButton } from "./ShareButton";
import { formatNumber } from "../../functions/numbers";

export const Actions = ({ data }) => {
  const { id, isSaved, user_id, saved, isLiked, liked, comments, title } = data;
  const text = "¡Mira este post en Feedgames!";
  const [savedNum, setSavedNum] = useState(saved.length);
  const [likedNum, setLikedNum] = useState(liked.length);

  return (
    <div className="flex justify-between items-center">
      <section className="flex gap-x-4">
        <span className="flex items-center justify-center gap-1">
          <LikeButton likeData={{ id, isLiked, setLikedNum, user_id }} />
          <p className="text-gray-500 text-xs">{formatNumber(likedNum)}</p>
        </span>
        <span className="flex items-center justify-center gap-1">
          <SaveButton saveData={{ id, isSaved, setSavedNum }} />
          <p className="text-gray-500 text-xs">{formatNumber(savedNum)}</p>
        </span>
        <span className="flex items-center justify-center gap-1">
          <CommentButton commentData={{ id }} />
          <p className="text-gray-500 text-xs">{comments.length}</p>
        </span>
      </section>
      <section>
        <ShareButton shareData={{ id, title, text, content: "post" }} />
      </section>
    </div>
  );
};
