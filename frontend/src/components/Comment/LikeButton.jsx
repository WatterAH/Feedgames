import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <div className="flex items-center gap-x-1">
      <button
        onClick={handleLike}
        className="active:scale-125 transition-transform"
      >
        <FontAwesomeIcon
          icon={liked ? faHeartSolid : faHeartRegular}
          className="h-4 text-red-300"
        />
      </button>
      <p className="text-gray-500 text-xs hover:underline">0</p>
    </div>
  );
};
