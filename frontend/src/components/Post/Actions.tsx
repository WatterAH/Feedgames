import React, { useState } from "react";
import Like from "./actions/Like";
import CommentButton from "./actions/CommentButton";
import Save from "./actions/Save";
import { PostInterface } from "@/interfaces/Post";
import { formatNumber } from "@/functions/utils";

interface Props {
  data: PostInterface;
}

const Actions: React.FC<Props> = ({ data }) => {
  const { id, user_id } = data;
  const { saved, isSaved, liked, isLiked, comments, isCommented } = data;
  const [savedNum, setSavedNum] = useState<number | undefined>(saved);
  const [likedNum, setLikedNum] = useState(liked);

  return (
    <div className="flex justify-between items-center mt-1">
      <section className="flex gap-x-3">
        <span className="flex items-center justify-center gap-1">
          <Like likeData={{ id, isLiked, setLikedNum, user_id }} />
          <p className="text-gray-500 text-xs">{formatNumber(likedNum)}</p>
        </span>
        <span className="flex items-center justify-center gap-1">
          <Save saveData={{ id, isSaved, setSavedNum }} />
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

export default Actions;
