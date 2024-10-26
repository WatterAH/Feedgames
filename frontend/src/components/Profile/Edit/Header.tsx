import Image from "next/image";
import React from "react";

interface Props {
  picture: string;
}

const Header: React.FC<Props> = ({ picture }) => {
  return (
    <div
      className="rounded-full h-20 w-20 bg-loading"
      style={{
        width: "80px",
        height: "80px",
        position: "relative",
      }}
    >
      <Image
        src={picture}
        alt=""
        fill
        priority
        className="object-cover cursor-pointer rounded-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Header;
