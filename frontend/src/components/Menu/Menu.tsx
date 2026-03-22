import MenuItems from "./MenuItems";
import Options from "./Options";
import Appareance from "./Theme/Appareance";
import { useState } from "react";

interface Props {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ setCreating }) => {
  const [appearance, setAppearance] = useState(false);

  const handleCreating = () => setCreating(true);

  return (
    <nav className="w-full md:w-16 lg:w-20 bottom-0 fixed left-0 md:top-0 px-3 z-50 h-14 md:h-full flex flex-col justify-center md:justify-between md:py-4 md:items-center duration-500 bg-(--blur)/80 md:bg-(--background) backdrop-blur-[10px]">
      <h1 className="font-pacifico text-3xl text-(--text) text-center hidden duration-500 md:block">
        Fg
      </h1>
      <MenuItems handleOpen={handleCreating} />
      <div className="hidden md:block">
        <Options appearanceCallback={() => setAppearance(true)} />
      </div>
      <Appareance open={appearance} setOpen={setAppearance} />
    </nav>
  );
};

export default Menu;
