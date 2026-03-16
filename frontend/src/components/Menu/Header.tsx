import { useState } from "react";
import Appareance from "./Theme/Appareance";
import Options from "./Options";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full fixed top-0 left-0 z-50 sm:h-16 pb-4 pt-2 md:hidden bg-(--blur)/80 backdrop-blur-[10px]">
      <h1 className="font-pacifico text-(--text) text-3xl text-center">Fg</h1>
      <div className="hover:cursor-pointer absolute right-2 top-1">
        <Options appearanceCallback={() => setOpen(true)} />
        <Appareance open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Header;
