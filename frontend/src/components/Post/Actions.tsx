import React, { useState } from "react";
import Like from "./actions/Like";
import Response from "./actions/ResponseButton";
import Save from "./actions/Save";
import { PostInterface } from "@/interfaces/Post";
import { stopPropagation } from "@/lib/utils";

interface Props {
  data: PostInterface;
}

const Actions: React.FC<Props> = ({ data }) => {
  const { id, user_id } = data;
  const { saved, isSaved, liked, isLiked, responsed } = data;
  const [savedNum, setSavedNum] = useState<number>(saved);
  const [likedNum, setLikedNum] = useState(liked);

  return (
    <div className="flex justify-between items-center mt-1 text-(--placeholder)">
      <section className="flex gap-x-2" onClick={stopPropagation}>
        <Like {...data} />
        <Save {...data} />
      </section>
      <section onClick={stopPropagation}>
        <Response {...data} />
      </section>
    </div>
  );
};

export default Actions;
