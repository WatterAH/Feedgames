import React from "react";
import NextImage from "next/image";
import Loader from "@/components/Global/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { stopPropagation } from "@/functions/utils";

interface Props {
  publicUrl: string;
}

const Image: React.FC<Props> = ({ publicUrl }) => {
  const src = `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/${publicUrl}`;

  return (
    <PhotoProvider
      className="backdrop-blur-sm"
      maskOpacity={0.5}
      bannerVisible={false}
      loadingElement={<Loader size="large" color="white" />}
    >
      <div
        className="w-full relative bg-loading rounded-md hover:cursor-pointer h-96 shadow-sm"
        onClick={stopPropagation}
      >
        <PhotoView src={src}>
          <NextImage
            src={src}
            alt={publicUrl}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
};

export default Image;
