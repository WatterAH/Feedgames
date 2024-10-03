import React from "react";
import NextImage from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { stopPropagation } from "@/functions/utils";

interface Props {
  publicUrl: string;
}

const Image: React.FC<Props> = ({ publicUrl }) => {
  const src = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${publicUrl}`;

  return (
    <PhotoProvider maskOpacity={0.8} bannerVisible={false}>
      <div
        className="w-full relative h-96 hover:cursor-pointer"
        onClick={stopPropagation}
      >
        <PhotoView src={src}>
          <NextImage
            src={src}
            alt={publicUrl}
            fill
            sizes="50vw"
            priority
            className="object-cover rounded-md"
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
};

export default Image;
