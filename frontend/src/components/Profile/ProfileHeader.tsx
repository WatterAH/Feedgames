import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import Follow from "./Follow";
import Names from "./Names";
import Theme from "./Theme/Theme";
import Details from "./Details";
import Dropdown from "../Global/Dropdown";
import SelectTheme from "./Theme/SelectTheme";
import { UserRoundCog } from "lucide-react";
import { User } from "@/interfaces/User";
import { useUser } from "@/context/AuthContext";
import { useProfileOptions } from "@/hooks/useOptions";
import { getThemeClasses } from "@/constants/themes";
import { SERVICE_IMAGE_URL } from "@/constants/server";

interface Props {
  data: User;
}

const ProfileHeader: React.FC<Props> = ({ data }) => {
  const { user, logout } = useUser();
  const { id, pfp, details, theme } = data;
  const [open, setOpen] = useState(false);
  const sameUser = user.id === id;
  const classes = getThemeClasses(theme);
  const src = SERVICE_IMAGE_URL + classes.backGround;
  const options = useProfileOptions(user, id, setOpen, logout);

  return (
    <>
      <div className={`relative w-full h-72 -mt-1.5`}>
        <div className="absolute z-20 flex flex-col gap-y-4 w-full p-4 lg:px-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-x-3">
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
          <p className={`${classes.detailsClass} text-sm font-inter`}>
            {details}
          </p>
          <div className="followContainer">
            <Follow data={data} />
          </div>
          <Details data={data} {...classes} />
        </div>

        {data.theme !== "default" && <Theme sameUser={sameUser} src={src} />}
      </div>
      <SelectTheme data={data} open={open} setOpen={setOpen} />
    </>
  );
};

export default ProfileHeader;
