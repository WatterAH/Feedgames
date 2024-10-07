import React from "react";
import Image from "next/image";
import PageLoader from "../Global/PageLoader";
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
      loadingElement={<PageLoader color="loading" />}
    >
      <div
        className="relative bg-loading rounded-full overflow-hidden"
        style={{ width: `${w}px`, height: `${h}px`, position: "relative" }}
      >
        {viewer ? (
          <PhotoView src={href}>
            <Image
              src={href}
              alt=""
              fill
              className="object-cover cursor-pointer rounded-full"
            />
          </PhotoView>
        ) : (
          <Image src={href} alt="" fill className="object-cover" />
        )}
      </div>
    </PhotoProvider>
  );
};

export default ProfilePicture;
