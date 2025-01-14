import React from "react";
import ProfilePicture from "../Profile/ProfilePicture";
import Header from "./Header";
import Content from "./Content";
import Link from "next/link";
import Actions from "./Actions";
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

  const handleClick = () => {
    router.push(`/p/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-row text-text gap-x-2 w-full border-b border-border p-2 sm:px-5 hover:cursor-pointer"
    >
      <Link href={`/u/${user_id}`} className="h-10" onClick={stopPropagation}>
        <ProfilePicture h={40} w={40} src={user.pfp} />
      </Link>
      <div className="flex flex-col w-full gap-y-2">
        <Header data={data} isLast={isLast} />
        <Content post={data} />
        <Actions data={data} />
      </div>
    </div>
  );
};

export default Post;
