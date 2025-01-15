import React, { useState } from "react";
import Dropdown from "@/components/Global/Dropdown";
import { useMenuOptions } from "@/hooks/useOptions";
import { AlignRight } from "lucide-react";
import { useUser } from "@/context/AuthContext";
import Appareance from "./Theme/Appareance";

const Header = () => {
  const { logout } = useUser();
  const [open, setOpen] = useState(false);
  const options = useMenuOptions(logout, setOpen);

  return (
    <>
      <div className="fixed top-0 z-50 sm:h-16 pb-4 pt-2 w-full lg:hidden bg-[rgba(var(--blur),0.8)] backdrop-blur-[10px]">
        <div className="relative">
          <h1 className="font-pacifico text-text text-3xl text-center">Fg</h1>
          <div className="hover:cursor-pointer absolute right-2 top-0">
            <Dropdown
              Icon={AlignRight}
              options={options}
              iconClass="h-8 w-8 text-menu-icon transition-all duration-500"
              position="left"
            />
          </div>
        </div>
      </div>
      <Appareance open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
