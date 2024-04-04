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
        <ChatSolid size={26} color={"rgb(96 165 250)"} />
      ) : (
        <ChatOut size={26} color={"rgb(96 165 250)"} />
      )}
    </Link>
  );
};
