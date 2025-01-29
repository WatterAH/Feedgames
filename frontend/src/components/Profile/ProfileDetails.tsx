import React from "react";
import { useUser } from "@/context/AuthContext";
import { useProfileOptions } from "@/hooks/useOptions";
import { User } from "@/interfaces/User";
import ProfilePicture from "./ProfilePicture";
import Names from "./Names";
import Dropdown from "../Global/Dropdown";
import { UserRoundCog } from "lucide-react";
import Follow from "./Follow";
import Details from "./Details";

interface Props {
  classes: any;
  data: User;
}

const ProfileDetails: React.FC<Props> = ({ classes, data }) => {
  const { user, logout } = useUser();
  const { pfp, bio } = data;
  const options = useProfileOptions(user, data.id, logout);

  return (
    <div className="absolute z-20 flex flex-col gap-y-4 w-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <ProfilePicture src={pfp} w={96} h={96} viewer />
          <Names data={data} {...classes} />
        </div>
        <Dropdown
          hover={false}
          Icon={UserRoundCog}
          options={options}
          position="left"
          {...classes}
        />
      </div>
      <p className={`${classes.detailsClass} text-sm font-inter`}>{bio}</p>
      <Follow data={data} />
      <Details data={data} {...classes} />
    </div>
  );
};

export default ProfileDetails;
