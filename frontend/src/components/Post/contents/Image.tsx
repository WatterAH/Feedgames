import React from "react";
import NextImage from "next/image";
import PageLoader from "@/components/Global/PageLoader";
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
      loadingElement={<PageLoader color="loading" />}
    >
      <div
        className="w-full relative bg-loading rounded-md h-96 hover:cursor-pointer"
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
