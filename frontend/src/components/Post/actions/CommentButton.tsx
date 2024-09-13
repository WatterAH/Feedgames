import { Link } from "react-router-dom";
import { ChatBubbleOvalLeftIcon as ChatOut } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon as ChatSolid } from "@heroicons/react/24/solid";

interface Props {
  id: string;
  isCommented: boolean;
}

export const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { id, isCommented } = commentData;
  return (
    <Link to={`/p/${id}`}>
      <button className="active:scale-125 transition-transform">
        {isCommented ? (
          <ChatSolid
            aria-hidden="true"
            className="h-6 text-blue-400 dark:text-blue-500"
          />
        ) : (
          <ChatOut
            aria-hidden="true"
            className="h-6 text-blue-400 dark:text-blue-500"
          />
        )}
      </button>
    </Link>
  );
};
