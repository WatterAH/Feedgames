import React from "react";
import { User } from "../../interfaces/User";
import ProfilePicture from "../Profile/ProfilePicture";
import { Link } from "react-router-dom";

interface Props {
  data: User;
}

const ProfileSuggestion: React.FC<Props> = ({ data }) => {
  const { username, pfp, id } = data;

  return (
    <Link to={`/u/${id}`}>
      <div className="flex flex-row justify-between hover:bg-gray-100 rounded-xl p-2">
        <section className="flex flex-row items-center gap-x-2">
          <ProfilePicture src={pfp} w="w-14" h="h-14" />
          <span className="flex flex-col">
            <p className="font-semibold">{username}</p>
            <p className="text-sm text-gray-500">Sugerido para ti</p>
          </span>
        </section>
      </div>
    </Link>
  );
};

export default ProfileSuggestion;
