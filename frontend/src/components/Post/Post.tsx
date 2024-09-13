import React from "react";
import { PostInterface } from "../../interfaces/Post";
import PostHeader from "./PostHeader";
import ProfilePicture from "../Profile/ProfilePicture";
import { Link } from "react-router-dom";
import PostContent from "./PostContent";
import { PostActions } from "./PostActions";

interface Props {
  data: PostInterface;
}

const Post: React.FC<Props> = ({ data }) => {
  const { user, user_id } = data;

  return (
    <main className="flex flex-row gap-x-2 w-full border-b p-2">
      <Link to={`/u/${user_id}`}>
        <ProfilePicture h="h-10" w="w-10" src={user.pfp} />
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
