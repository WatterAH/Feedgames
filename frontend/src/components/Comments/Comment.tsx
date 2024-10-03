"use client";
import Link from "next/link";
import React from "react";
import ProfilePicture from "../Profile/ProfilePicture";
import Header from "./Header";
import Content from "./Content";
import Actions from "./Actions";
import { CommentInterface } from "@/interfaces/Comment";

interface Props {
  data: CommentInterface;
}

const Comment: React.FC<Props> = ({ data }) => {
  const { id_user, user } = data;

  return (
    <main className="flex flex-row gap-x-2 w-full border-b p-2 sm:px-4">
      <Link href={`/u/${id_user}`}>
        <ProfilePicture h={40} w={40} src={user.pfp} />
      </Link>
      <div className="flex flex-col gap-y-1 w-full">
        <Header data={data} />
        <Content data={data} />
        <Actions data={data} />
      </div>
    </main>
  );
};

export default Comment;
