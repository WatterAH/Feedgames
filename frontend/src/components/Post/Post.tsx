import React from "react";
import ProfilePicture from "../Profile/ProfilePicture";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import Link from "next/link";
import { PostInterface } from "@/interfaces/Post";
import { PostActions } from "./PostActions";

interface Props {
  data: PostInterface;
}

const Post: React.FC<Props> = ({ data }) => {
  const { user, user_id } = data;

  return (
    <main className="flex flex-row gap-x-2 w-full border-b p-2 sm:px-4">
      <Link href={`/u/${user_id}`}>
        <ProfilePicture h={40} w={40} src={user.pfp} />
      </Link>
      <div className="flex flex-col gap-y-1 w-full">
        <PostHeader data={data} />
        <PostContent data={data} />
        <PostActions data={data} />
      </div>
    </main>
  );
};

export default Post;
