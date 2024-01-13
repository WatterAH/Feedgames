import React, { useState } from "react";
import { ImageViewer } from "../ImageViewer";
import default_pfp from "../../assets/img/default.png";

export const ProfilePicture = ({ src, size }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <img
        src={
          src
            ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${src}`
            : default_pfp
        }
        alt="pfp"
        className={`rounded-full h-${size} w-${size} cursor-pointer`}
        onClick={src ? openModal : null}
      />
      <ImageViewer closeModal={closeModal} isOpen={isOpen} src={src} />
    </>
  );
};
