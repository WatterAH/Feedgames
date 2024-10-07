import React from "react";
import ProfilePicture from "./ProfilePicture";
import Follow from "./Follow";
import Names from "./Names";
import Details from "./Details";
import Dropdown from "../Global/Dropdown";
import { Menu } from "lucide-react";
import { User } from "@/interfaces/User";
import { useUser } from "@/context/AuthContext";
import { useProfileOptions } from "@/hooks/useOptions";

interface Props {
  data: User;
}

const ProfileHeader: React.FC<Props> = ({ data }) => {
  const { user } = useUser();
  const { id, pfp, details } = data;
  const options = useProfileOptions(user, id);

  return (
    <header className="flex flex-col gap-y-4 w-full p-3 lg:px-4 border-b">
      <div className="flex flex-row justify-between items-center">
        <div className="namesContainer flex flex-row items-center gap-x-3">
          <ProfilePicture src={pfp} w={96} h={96} viewer />
          <Names data={data} />
        </div>
        <Dropdown Icon={Menu} options={options} position="left" />
      </div>
      <p className="text-secondaryicon text-sm font-inter">{details}</p>
      <div className="followContainer">
        <Follow data={data} />
      </div>
      <Details data={data} />
    </header>
  );
};

export default ProfileHeader;
