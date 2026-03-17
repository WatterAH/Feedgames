import React from "react";
import { User } from "@/interfaces/User";
import ProfilePicture from "./ProfilePicture";
import Names from "./Names";
import Follow from "./Follow";
import Details from "./Details";
import Options from "./Options";

interface Props {
  classes: any;
  data: User;
}

const ProfileDetails: React.FC<Props> = ({ classes, data }) => {
  const { pfp, bio } = data;

  return (
    <div className="absolute z-20 flex flex-col gap-y-4 w-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <ProfilePicture src={pfp} w={96} h={96} viewer />
          <Names data={data} {...classes} />
        </div>
        <div>
          <Options userId={data.id} />
        </div>
      </div>
      <p className={`${classes.detailsClass} text-sm font-inter`}>{bio}</p>
      <Follow data={data} />
      <Details data={data} {...classes} />
    </div>
  );
};

export default ProfileDetails;
