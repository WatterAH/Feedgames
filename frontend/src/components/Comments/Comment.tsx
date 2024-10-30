import Link from "next/link";
import React from "react";
import ProfilePicture from "../Profile/ProfilePicture";
import Header from "./Header";
import Content from "../Post/Content";
import Actions from "./Actions";
import { useRouter } from "next/navigation";
import { CommentInterface } from "@/interfaces/Comment";
import { stopPropagation } from "@/functions/utils";

interface Props {
  data: CommentInterface;
  deleteComment: (id: string) => void;
}

const Comment: React.FC<Props> = ({ data, deleteComment }) => {
  const { id_user, user, id } = data;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/r/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-row gap-x-2 w-full border-b dark:border-outline p-2 sm:px-5 hover:cursor-pointer"
    >
      <Link href={`/u/${id_user}`} className="h-10" onClick={stopPropagation}>
        <ProfilePicture h={40} w={40} src={user.pfp} />
      </Link>
      <div className="flex flex-col gap-y-2 w-full">
        <Header data={data} deleteComment={deleteComment} />
        <Content data={data} />
        <Actions data={data} />
      </div>
    </div>
  );
};

export default Comment;
