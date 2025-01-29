import React, { useState } from "react";
import { SERVICE_IMAGE_URL } from "@/constants/server";

interface Props {
  src: string;
  height: string;
}

const Theme: React.FC<Props> = ({ src, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const source = SERVICE_IMAGE_URL + src;

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  const handleOnPlay = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  return (
    <div className="relative overflow-hidden lg:rounded-t-3xl">
      <video
        key={source}
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
        onLoadedData={handleOnLoad}
        onPlay={handleOnPlay}
        className={`${height} w-full blur-[1px] object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={source} type="video/mp4" />
      </video>
    </div>
  );
};

export default Theme;
