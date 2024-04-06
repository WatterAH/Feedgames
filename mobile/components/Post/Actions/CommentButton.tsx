import React from "react";
import { Link } from "expo-router";
import { ChatBubbleOvalLeftIcon as ChatOut } from "react-native-heroicons/outline";
import { ChatBubbleOvalLeftIcon as ChatSolid } from "react-native-heroicons/solid";

interface Props {
  id: string;
  isCommented: boolean;
}

export const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { id, isCommented } = commentData;
  return (
    <Link
      href={{
        pathname: "/(tabs)/home/[id]",
        params: { id },
      }}
    >
      {isCommented ? (
        <ChatSolid size={24} className="tecya" color={"rgb(103, 232, 249)"} />
      ) : (
        <ChatOut size={24} color={"rgb(103, 232, 249)"} />
      )}
    </Link>
  );
};
