import { AppDispatch, RootState } from "@/store/store";
import { loadedTheme } from "@/store/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  src: string;
  sameUser: boolean;
}

const Theme: React.FC<Props> = ({ src, sameUser }) => {
  const { themeLoaded } = useSelector((state: RootState) => state.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (sameUser) {
      setIsLoaded(themeLoaded);
    }
  }, [sameUser, themeLoaded]);

  const handleOnLoad = () => {
    if (sameUser) {
      dispatch(loadedTheme());
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  };

  return (
    <div className="relative h-72 w-full">
      <video
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
        onLoadedData={handleOnLoad}
        className={`h-72 w-full object-cover lg:rounded-t-3xl transition-opacity duration-500 blur-xs filter ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default Theme;
