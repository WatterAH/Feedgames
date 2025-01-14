import { Theme } from "@/constants/themes";
import { Check } from "lucide-react";

interface Props {
  src: string;
  theme: string;
  value: Theme;
  setTheme: (theme: Theme) => void;
  current: Theme;
}

const Preview: React.FC<Props> = ({ src, theme, value, setTheme, current }) => {
  const handleClick = () => {
    setTheme(value);
  };

  return (
    <div
      onClick={handleClick}
      className="relative shadow-md w-full flex flex-col hover:cursor-pointer"
    >
      {current === value && (
        <div className="absolute top-2 right-2 z-20 p-1 bg-white rounded-full">
          <Check className="h-4 w-4 text-threads" />
        </div>
      )}
      <div className="relative border border-border rounded-t-md w-full h-32">
        {src !== "white" ? (
          <video
            autoPlay
            loop
            muted
            preload="auto"
            playsInline
            className="h-32 w-full object-cover rounded-t-md"
          >
            <source src={src} />
          </video>
        ) : null}
      </div>
      <div className="border border-border rounded-b-md p-2">
        <p className="text-xs font-montserrat font-medium text-center">
          {theme}
        </p>
      </div>
    </div>
  );
};

export default Preview;
