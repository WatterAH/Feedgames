import React, { useRef } from "react";
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
    <>
      <Pressable>
        {isCommented ? (
          <ChatSolid size={24} color={"rgb(103, 232, 249)"} />
        ) : (
          <ChatOut size={24} color={"rgb(103, 232, 249)"} />
        )}
      </Pressable>
    </>
  );
};
