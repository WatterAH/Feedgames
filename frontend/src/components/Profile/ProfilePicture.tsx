import React from "react";
import default_pfp from "../../assets/default.png";

interface Props {
  src: string | undefined;
  h: string;
  w: string;
}

const ProfilePicture: React.FC<Props> = ({ src, h, w }) => {
  const href = src
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${src}`
    : default_pfp;

  return (
    <div className={`${w} ${h} bg-[#eaeaea] rounded-full`}>
      <img src={href} alt="pfp" className={`${w} ${h} rounded-full`} />
    </div>
  );
};

export default ProfilePicture;
