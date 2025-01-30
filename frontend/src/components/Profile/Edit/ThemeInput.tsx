import React, { useState } from "react";
import SelectTheme from "../Theme/SelectTheme";
import { Theme } from "@/constants/themes";
import Image from "next/image";

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeInput: React.FC<Props> = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  return (
    <>
      <div
        className="flex flex-col items-center gap-y-2 hover:cursor-pointer"
        onClick={handleClick}
      >
        <div className="rounded-full relative h-24 w-24 bg-background">
          {theme !== "default" && (
            <Image
              fill
              src={`/themes/${theme}.png`}
              alt={theme}
              className="rounded-full object-cover"
            />
          )}
        </div>
        <p className="text-text font-medium">Tema de perfil</p>
      </div>
      <SelectTheme
        open={open}
        setOpen={setOpen}
        theme={theme}
        setTheme={setTheme}
      />
    </>
  );
};

export default ThemeInput;
