import React, { useState } from "react";
import { ImageViewer } from "../ImageViewer";
import default_pfp from "../../assets/img/default.png";

interface Props {
  src: string | undefined;
  h: string;
  w: string;
}

export const ProfilePicture: React.FC<Props> = ({ src, h, w }) => {
  let [isOpen, setIsOpen] = useState(false);
  const href = src
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${src}`
    : default_pfp;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleClick = src ? openModal : () => {};

  return (
    <>
      <img
        src={href}
        alt="pfp"
        className={`rounded-full ${w} ${h} cursor-pointer flex items-center justify-center`}
        onClick={handleClick}
      />
      <ImageViewer closeModal={closeModal} isOpen={isOpen} src={src} />
    </>
  );
};
