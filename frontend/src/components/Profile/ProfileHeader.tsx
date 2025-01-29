import React from "react";
import Theme from "./Theme/Theme";
import ProfileDetails from "./ProfileDetails";
import { User } from "@/interfaces/User";
import { getThemeClasses } from "@/constants/themes";

interface Props {
  data: User;
}

const ProfileHeader: React.FC<Props> = ({ data }) => {
  const { theme } = data;
  const classes = getThemeClasses(theme);

  return (
    <div className="relative w-full border-b border-border -mt-1.5">
      <ProfileDetails classes={classes} data={data} />
      {theme !== "default" && <Theme src={classes.backGround} height="h-72" />}
    </div>
  );
};

export default ProfileHeader;
