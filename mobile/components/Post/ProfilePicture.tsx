import React, { useState } from "react";
import default_pfp from "../../assets/images/default.png";
import { Image } from "react-native";

interface Props {
  src: string | undefined;
  h: string;
  w: string;
}

export const ProfilePicture: React.FC<Props> = ({ src, h, w }) => {
  const href = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${src}`;

  return (
    <Image
      source={src ? { uri: href } : require("../../assets/images/default.png")}
      className={`rounded-full ${w} ${h} cursor-pointer flex items-center justify-center`}
    />
  );
};
