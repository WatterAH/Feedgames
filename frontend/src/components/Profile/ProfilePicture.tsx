import React from "react";
import Image from "next/image";
import Loader from "../Global/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface Props {
  src?: string;
  h: number;
  w: number;
  viewer?: boolean;
}

const ProfilePicture: React.FC<Props> = ({ src, h, w, viewer }) => {
  const href = src ? `${process.env.NEXT_PUBLIC_IMAGES}${src}` : "/default.png";
  const containerStyle = { width: `${w}px`, height: `${h}px` };
  const imageClasses = "object-cover rounded-full";

  const renderImage = () => (
    <Image
      src={href}
      alt="Profile picture"
      fill
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={viewer ? `${imageClasses} cursor-pointer` : imageClasses}
    />
  );

  return (
    <PhotoProvider
      className="backdrop-blur-sm"
      maskOpacity={0.5}
      bannerVisible={false}
      loadingElement={<Loader size="large" color="white" />}
    >
      <div
        className="relative bg-loading rounded-full overflow-hidden"
        style={containerStyle}
      >
        {viewer && <PhotoView src={href}>{renderImage()}</PhotoView>}
        {!viewer && renderImage()}
      </div>
    </PhotoProvider>
  );
};

export default ProfilePicture;
