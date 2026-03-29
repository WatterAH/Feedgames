import React from "react";
import Image from "next/image";
import Loader from "../ui/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useSocket } from "@/context/SocketContext";
import { cn } from "@/lib/utils";

interface Props {
  src?: string;
  h: number;
  w: number;
  viewer?: boolean;
  userId?: string;
}

const ProfilePicture: React.FC<Props> = ({ userId, src, h, w, viewer }) => {
  const { onlineUsers } = useSocket();

  const imageUrl = src ? `${process.env.NEXT_PUBLIC_IMAGES}${src}` : null;

  const containerStyle = { width: `${w}px`, height: `${h}px` };
  const imageClasses = "object-cover rounded-full";
  const indicatorSize = Math.min(Math.round(w * 0.23), 24);
  const offset = Math.round(w * 0.01);

  const active = onlineUsers.includes(userId || "");

  const renderDefault = () => (
    <div className="w-full h-full bg-(--loader) flex items-center justify-center rounded-full overflow-hidden">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-(--text) w-3/5 h-3/5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );

  const renderImage = () => (
    <Image
      src={imageUrl!}
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
        <div
          className={cn(
            "w-full h-full rounded-full overflow-hidden",
            imageUrl && "bg-(--loader)",
          )}
        >
          {imageUrl ? (
            viewer ? (
              <PhotoView src={imageUrl}>{renderImage()}</PhotoView>
            ) : (
              renderImage()
            )
          ) : (
            renderDefault()
          )}
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
