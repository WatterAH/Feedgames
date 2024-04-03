import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { ChatBubbleOvalLeftIcon as ChatOut } from "react-native-heroicons/outline";
import { ChatBubbleOvalLeftIcon as ChatSolid } from "react-native-heroicons/solid";

interface Props {
  id: string;
  isCommented: boolean;
}

export const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { id, isCommented } = commentData;
  return (
    <Link href="/profile">
      <Pressable>
        {isCommented ? (
          <ChatSolid className="h-6" color={"rgb(96 165 250)"} />
        ) : (
          <ChatOut className="h-6" color={"rgb(96 165 250)"} />
        )}
      </Pressable>
    </Link>
  );
};
