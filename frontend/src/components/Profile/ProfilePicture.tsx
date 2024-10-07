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
    <div
      className="relative bg-loading rounded-full overflow-hidden"
      style={{ width: `${w}px`, height: `${h}px`, position: "relative" }}
    >
      <Image src={href} alt="pfp" fill className="object-cover" />
    </div>
  );
};

export default ProfilePicture;
