import React, { useState } from "react";
import Dropdown from "@/components/Global/Dropdown";
import Appareance from "./Theme/Appareance";
import { useMenuOptions } from "@/hooks/useOptions";
import { AlignRight } from "lucide-react";
import { useUser } from "@/context/AuthContext";

const Header = () => {
  const { logout } = useUser();
  const [open, setOpen] = useState(false);
  const options = useMenuOptions(logout, setOpen);

  return (
    <div className="w-full fixed top-0 left-0 z-50 sm:h-16 pb-4 pt-2 lg:hidden bg-[rgba(var(--blur),0.8)] backdrop-blur-[10px]">
      <h1 className="font-pacifico text-text text-3xl text-center">Fg</h1>
      <div className="hover:cursor-pointer absolute right-2 top-1">
        <Dropdown
          Icon={AlignRight}
          options={options}
          iconClass="h-8 w-8 text-menu-icon transition-all duration-500"
          position="left"
        />
        <Appareance open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Header;
