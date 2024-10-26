import React from "react";
import ProfilePicture from "@/components/Profile/ProfilePicture";

interface Props {
  username: string;
  pfp?: string;
}

const Header: React.FC<Props> = ({ username, pfp }) => {
  return (
    <div className="flex items-center gap-x-2">
      <ProfilePicture src={pfp} w={40} h={40} />
      <div className="mb-2">
        <p className="font-semibold">{username}</p>
      </div>
    </div>
  );
};

export default Header;
