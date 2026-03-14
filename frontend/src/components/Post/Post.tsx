import React from "react";
import Header from "./Header";
import Content from "./Content";
import Link from "next/link";
import Actions from "./Actions";
import ProfilePicture from "../Profile/ProfilePicture";
import { PostInterface } from "@/interfaces/Post";
import { useRouter } from "next/navigation";
import { stopPropagation } from "@/functions/utils";

interface Props {
  data: PostInterface;
  isLast?: boolean;
}

const Post: React.FC<Props> = ({ data, isLast }) => {
  const { id, user, user_id } = data;
  const router = useRouter();

  const handleClick: React.MouseEventHandler<Element> = (e) => {
    stopPropagation(e);
    router.push(`/u/${user_id}`);
  };

  return (
    <Link
      href={`/p/${id}`}
      className="flex flex-row text-text gap-x-2 w-full border-b border-border p-2 sm:px-5 hover:cursor-pointer"
    >
      <div className="h-10" onClick={handleClick}>
        <ProfilePicture h={40} w={40} src={user.pfp} />
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <Header data={data} isLast={isLast} />
        <Content post={data} />
        <Actions data={data} />
      </div>
    </Link>
  );
};

export default Post;
