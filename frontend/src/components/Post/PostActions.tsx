import React, { useState } from "react";
import { LikeButton } from "./Actions/LikeButton";
import { CommentButton } from "./Actions/CommentButton";
import { SaveButton } from "./Actions/SaveButton";
import { formatNumber } from "../../functions/numbers";
import { PostInterface } from "../../interfaces/Post";

interface Props {
  data: PostInterface;
}

export const PostActions: React.FC<Props> = ({ data }) => {
  const { id, user_id } = data;
  const { saved, isSaved, liked, isLiked, comments, isCommented } = data;
  const [savedNum, setSavedNum] = useState<number | undefined>(saved);
  const [likedNum, setLikedNum] = useState(liked);

  return (
    <div className="flex justify-between items-center mb-5">
      <section className="flex gap-x-3">
        <span className="flex items-center justify-center gap-1">
          <LikeButton likeData={{ id, isLiked, setLikedNum, user_id }} />
          <p className="text-gray-500 text-xs">{formatNumber(likedNum)}</p>
        </span>
        <span className="flex items-center justify-center gap-1">
          <SaveButton saveData={{ id, isSaved, setSavedNum }} />
          <p className="text-gray-500 text-xs">{formatNumber(savedNum)}</p>
        </span>
      </section>
      <section>
        <span className="flex items-center justify-center gap-1">
          <CommentButton commentData={{ id, isCommented }} />
          <p className="text-gray-500 text-xs mb-1">{comments}</p>
        </span>
      </section>
    </div>
  );
};
