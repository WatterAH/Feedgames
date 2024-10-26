import React, { useState } from "react";
import Like from "./actions/Like";
import { Forward } from "lucide-react";
import { CommentInterface } from "@/interfaces/Comment";

interface Props {
  data: CommentInterface;
}

const Actions: React.FC<Props> = ({ data }) => {
  const { id, id_user } = data;
  const { isLiked, liked } = data;
  const [likedNum, setLikedNum] = useState(liked);

  return (
    <div className="flex justify-between items-center mt-1">
      <section className="flex gap-x-3">
        <span className="flex items-center justify-center gap-1">
          <Like likeData={{ id, isLiked, setLikedNum, id_user }} />
          <p className="text-gray-500 text-xs">{likedNum}</p>
        </span>
      </section>
      <section>
        <span className="flex items-center justify-center gap-1">
          <Forward />
        </span>
      </section>
    </div>
  );
};

export default Actions;
