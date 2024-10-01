import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  isCommented: boolean;
}

export const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { id, isCommented } = commentData;
  return (
    <Link href={`/p/${id}`}>
      <button className="active:scale-125 transition-transform">
        <MessageCircle
          aria-hidden="true"
          fill={isCommented ? "#67e8f9" : "white"}
          className="h-5 text-cyan-300"
        />
      </button>
    </Link>
  );
};
