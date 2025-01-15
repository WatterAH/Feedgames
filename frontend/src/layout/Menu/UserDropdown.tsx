import React, { useState } from "react";
import Dropdown from "@/components/Global/Dropdown";
import { useUser } from "@/context/AuthContext";
import { useMenuOptions } from "@/hooks/useOptions";
import { AlignLeft } from "lucide-react";
import Appareance from "./Theme/Appareance";

const UserDropdown = () => {
  const { logout } = useUser();
  const [open, setOpen] = useState(false);
  const options = useMenuOptions(logout, setOpen);

  return (
    <div className="hidden lg:block hover:cursor-pointer">
      <Dropdown
        Icon={AlignLeft}
        options={options}
        iconClass="h-8 w-8 text-menu-icon transition-all duration-500"
        position="top"
      />
      <Appareance open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserDropdown;
