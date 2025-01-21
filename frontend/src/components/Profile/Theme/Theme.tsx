import React, { useEffect, useState } from "react";
import { loadedTheme } from "@/store/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { SERVICE_IMAGE_URL } from "@/constants/server";

interface Props {
  src: string;
  sameUser: boolean;
}

const Theme: React.FC<Props> = ({ src, sameUser }) => {
  const { themeLoaded } = useSelector((state: RootState) => state.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const source = SERVICE_IMAGE_URL + src;
  console.log(source);

  useEffect(() => {
    if (sameUser) {
      setIsLoaded(themeLoaded);
    }
  }, [sameUser, themeLoaded]);

  const handleOnLoad = () => {
    if (sameUser) {
      dispatch(loadedTheme());
    }
    setIsLoaded(true);
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
        className={`h-72 w-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={source} type="video/mp4" />
      </video>
    </div>
  );
};

export default Theme;
