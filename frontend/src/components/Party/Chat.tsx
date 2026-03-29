import React from "react";
import Title from "../Layout/Title";
import { Party } from "@/interfaces/Party";
import Card from "../Layout/Card";

interface Props extends Party {
  error?: boolean;
}

const Chat: React.FC<Props> = ({ error, ...data }) => {
  const { id, name, members } = data;

  function getName() {
    if (name) return name;
    if (members.length === 1) {
      return members[0].name;
    }
    return members.map((member) => member.name).join(", ");
  }

  return (
    <>
      <Title title={getName()} />
      <Card />
      <div className="w-full max-w-2xl pt-20 pb-14 md:pt-3 md:mt-[11vh] lg:pb-0 z-10"></div>
    </>
  );
};

export default Chat;
