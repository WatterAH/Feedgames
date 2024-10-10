import React from "react";
import Dropdown from "@/components/Global/Dropdown";
import { useMenuOptions } from "@/hooks/useOptions";
import { AlignRight } from "lucide-react";

const Header = () => {
  const options = useMenuOptions();

  return (
    <div className="fixed top-0 z-50 sm:h-10 bg-barcelona pb-4 pt-2 w-full lg:hidden backdrop-blur-md bg-opacity-80">
      <div className="relative">
        <h1 className="font-pacifico text-threads text-3xl text-center">Fg</h1>
        <div className="hover:cursor-pointer absolute right-2 top-0">
          <Dropdown
            Icon={AlignRight}
            options={options}
            iconClass="h-8 w-8 text-icon hover:text-threads transition-all duration-500"
            position="left"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
