import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface Props {
  id: string;
  isCommented: boolean;
}

const CommentButton = ({ commentData }: { commentData: Props }) => {
  const { id, isCommented } = commentData;

  return (
    <Link href={`/p/${id}`}>
      <button className="active:scale-125 transition-transform">
        <MessageCircle
          aria-hidden="true"
          fill={isCommented ? "#67e8f9" : "white"}
          className="h-6 w-6 md:h-5 md:w-5 text-cyan-300"
        />
      </button>
    </Link>
  );
};

export default CommentButton;
