import React from "react";
import Image from "next/image";

interface Props {
  src: string | undefined;
  h: number;
  w: number;
}

const ProfilePicture: React.FC<Props> = ({ src, h, w }) => {
  const href = src ? process.env.NEXT_PUBLIC_IMAGES + src : "/default.png";

  return (
    <div className={`w-[${w}] w-[${h}] bg-[#eaeaea] rounded-full`}>
      <Image
        src={href}
        alt="pfp"
        width={w}
        height={h}
        className={`rounded-full`}
      />
    </div>
  );
};

export default ProfilePicture;
