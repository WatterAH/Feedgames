import { Theme } from "@/constants/themes";
import { Check } from "lucide-react";
import Image from "next/image";

interface Props {
  src: string;
  theme: string;
  value: Theme;
  current: Theme;
  setTheme: (theme: Theme) => void;
}

const Preview: React.FC<Props> = ({ src, theme, current, setTheme, value }) => {
  const handleClick = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <div
      onClick={() => handleClick(value)}
      className="relative flex flex-col hover:cursor-pointer"
    >
      {current === value && (
        <div className="absolute top-1 right-2 z-20 p-0.5 bg-white rounded-full">
          <Check className="h-4 w-4" />
        </div>
      )}
      <div className="relative border rounded-t-md w-28 h-14">
        {src !== "white" ? (
          <Image
            alt={theme}
            src={src}
            className="object-cover rounded-t-md"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="border rounded-b-md p-1">
        <p className="text-xs font-montserrat font-medium text-center">
          {theme}
        </p>
      </div>
    </div>
  );
};

export default Preview;
