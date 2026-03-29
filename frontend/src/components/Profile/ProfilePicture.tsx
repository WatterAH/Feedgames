import React from "react";
import Image from "next/image";
import Loader from "../ui/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useSocket } from "@/context/SocketContext";

interface Props {
  src?: string;
  h: number;
  w: number;
  viewer?: boolean;
  userId?: string;
}

const ProfilePicture: React.FC<Props> = ({ userId, src, h, w, viewer }) => {
  const { onlineUsers } = useSocket();
  const href = src ? `${process.env.NEXT_PUBLIC_IMAGES}${src}` : "/default.png";
  const containerStyle = { width: `${w}px`, height: `${h}px` };
  const imageClasses = "object-cover rounded-full";
  const indicatorSize = Math.min(Math.round(w * 0.23), 24);
  const offset = Math.round(w * 0.01);

  const active = onlineUsers.includes(userId || "");

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
      className="backdrop-blur-sm relative"
      maskOpacity={0.5}
      bannerVisible={false}
      loadingElement={<Loader size="large" color="white" />}
    >
      <div className="relative" style={containerStyle}>
        <div className="w-full h-full rounded-full overflow-hidden bg-loading">
          {viewer && <PhotoView src={href}>{renderImage()}</PhotoView>}
          {!viewer && renderImage()}
        </div>

        {active && (
          <div
            className="absolute rounded-full bg-green-500 z-50 transition-all "
            style={{
              width: `${indicatorSize}px`,
              height: `${indicatorSize}px`,
              right: `${offset}px`,
              bottom: `${offset}px`,
              boxShadow: `0 0 ${indicatorSize / 2}px rgba(74, 222, 128, 0.8)`,
            }}
          />
        )}
      </div>
    </PhotoProvider>
  );
};

export default ProfilePicture;
