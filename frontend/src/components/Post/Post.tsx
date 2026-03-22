import React from "react";
import Header from "./Header";
import Content from "./Content";
import Link from "next/link";
import Actions from "./Actions";
import ProfilePicture from "../Profile/ProfilePicture";
import { BProgress } from "@bprogress/core";
import { PostInterface } from "@/interfaces/Post";
import { useRouter } from "next/navigation";
import { stopPropagation } from "@/lib/utils";

interface Props {
  data: PostInterface;
}

const Post: React.FC<Props> = ({ data }) => {
  const { id, user, user_id } = data;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.role == "menuitem") return;
    if (target.id == "dialog-overlay") return;
    BProgress.start();

    router.push(`/p/${id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="flex flex-row text-(--text) gap-x-2 w-full border-b border-(--border) p-2 sm:px-5 cursor-pointer"
    >
      <Link href={`/u/${user_id}`} className="h-10" onClick={stopPropagation}>
        <ProfilePicture h={40} w={40} src={user.pfp} />
      </Link>
      <div className="flex flex-col w-full gap-y-2">
        <Header data={data} />
        <Content post={data} />
        <Actions data={data} />
      </div>
    </article>
  );
};

export default Post;
