import React, { PropsWithChildren } from "react";
import ProfilePicture from "@/components/Profile/ProfilePicture";

interface Props extends PropsWithChildren {
  username: string;
  pfp?: string;
}

const Header: React.FC<Props> = ({ username, pfp, children }) => {
  return (
    <div className="flex flex-row gap-x-2 w-full">
      <ProfilePicture src={pfp} w={44} h={40} />
      <div className="flex flex-col gap-y-1 w-full">
        <p className="font-semibold">{username}</p>
        {children}
      </div>
    </div>
  );
};

export default Header;
