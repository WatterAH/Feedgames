import React from "react";
import Image from "next/image";
import Loader from "../Global/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface Props {
  src: string | undefined;
  h: number;
  w: number;
  viewer?: boolean;
}

const ProfilePicture: React.FC<Props> = ({ src, h, w, viewer }) => {
  const href = src ? process.env.NEXT_PUBLIC_IMAGES + src : "/default.png";

  return (
    <PhotoProvider
      className="backdrop-blur-sm"
      maskOpacity={0.5}
      bannerVisible={false}
      loadingElement={<Loader size="large" color="white" />}
    >
      <div
        className="relative bg-loading dark:bg-outline rounded-full overflow-hidden"
        style={{ width: `${w}px`, height: `${h}px`, position: "relative" }}
      >
        {viewer ? (
          <PhotoView src={href}>
            <Image
              src={href}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover cursor-pointer rounded-full"
            />
          </PhotoView>
        ) : (
          <Image
            src={href}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>
    </PhotoProvider>
  );
};

export default ProfilePicture;
