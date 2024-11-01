import React, { useState } from "react";
import Like from "./actions/Like";
import Response from "./actions/ResponseButton";
import Save from "./actions/Save";
import { PostInterface } from "@/interfaces/Post";
import { stopPropagation } from "@/functions/utils";

interface Props {
  data: PostInterface;
}

const Actions: React.FC<Props> = ({ data }) => {
  const { id, user_id } = data;
  const { saved, isSaved, liked, isLiked, responsed } = data;
  const [savedNum, setSavedNum] = useState<number>(saved);
  const [likedNum, setLikedNum] = useState(liked);

  return (
    <div className="flex justify-between items-center mt-1">
      <section className="flex gap-x-2" onClick={stopPropagation}>
        <span className="flex items-center justify-center gap-1 rounded-full transition-all duration-200 active:scale-75">
          <Like likeData={{ id, isLiked, setLikedNum, user_id }} />
          <p className="text-darkgray text-xs">{likedNum}</p>
        </span>
        <span className="flex items-center justify-center gap-1 transition-all duration-200 active:scale-75">
          <Save saveData={{ id, isSaved, setSavedNum }} />
          <p className="text-darkgray text-xs">{savedNum}</p>
        </span>
      </section>
      <section>
        <span className="flex items-center justify-center gap-1">
          <Response data={data} />
          <p className="text-darkgray text-xs mb-1">{responsed}</p>
        </span>
      </section>
    </div>
  );
};

export default Actions;
