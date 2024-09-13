import React from "react";
import ProfilePicture from "../Profile/ProfilePicture";
import { Note as NoteInterface } from "../../interfaces/Post";

interface Props {
  data: NoteInterface;
}

const Note: React.FC<Props> = ({ data }) => {
  const { user, note } = data;
  const { pfp, username } = user;
  return (
    <div className="flex flex-col items-center gap-y-2 w-24 hover:cursor-pointer">
      <ProfilePicture src={pfp} w="w-20" h="h-20" />
      <p className="font-semibold">{username}</p>
      <p className="text-xs text-center text-gray-500">{note}</p>
    </div>
  );
};

export default Note;
