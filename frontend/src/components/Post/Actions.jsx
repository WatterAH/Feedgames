import React, { useState } from "react";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { SaveButton } from "./SaveButton";
import { ShareButton } from "./ShareButton";
import { formatNumber } from "../../functions/numbers";

export const Actions = ({ data }) => {
  const { id, isSaved, user_id, saved, isLiked, liked, comments } = data;
  const [savedNum, setSavedNum] = useState(saved.length);
  const [likedNum, setLikedNum] = useState(liked.length);

  return (
    <section className="flex gap-x-4">
      <section className="flex items-center justify-center gap-1">
        <LikeButton likeData={{ id, isLiked, setLikedNum, user_id }} />
        <p className="text-gray-500 text-xs">{formatNumber(likedNum)}</p>
      </section>
      <section className="flex items-center justify-center gap-1">
        <CommentButton commentData={{ id }} />
        <p className="text-gray-500 text-xs">{comments.length}</p>
      </section>
      <section className="flex items-center justify-center gap-1">
        <SaveButton saveData={{ id, isSaved, setSavedNum }} />
        <p className="text-gray-500 text-xs">{formatNumber(savedNum)}</p>
      </section>
      <section>
        <ShareButton content={"Post"} data={data} />
      </section>
    </section>
  );
};
