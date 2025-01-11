import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import Follow from "./Follow";
import Names from "./Names";
import Details from "./Details";
import Dropdown from "../Global/Dropdown";
import Image from "next/image";
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
  const { id, pfp, details } = data;
  const [theme, setTheme] = useState(data.theme);
  const [open, setOpen] = useState(false);
  const classes = getThemeClasses(theme);
  const img = SERVICE_IMAGE_URL + classes.backGround;
  console.log(img);
  const options = useProfileOptions(user, id, setOpen, logout);

  return (
    <>
      <div className="relative w-full h-72 -mt-1.5 border-b">
        <div className="absolute z-20 flex flex-col gap-y-4 w-full p-4 lg:px-4">
          <div className="flex flex-row justify-between items-center">
            <div className="namesContainer flex flex-row items-center gap-x-3">
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

        {theme !== "default" && (
          <Image
            src={img}
            alt="link"
            className="object-cover lg:rounded-t-3xl"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        )}
      </div>
      <SelectTheme
        setTheme={setTheme}
        current={theme}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default ProfileHeader;
