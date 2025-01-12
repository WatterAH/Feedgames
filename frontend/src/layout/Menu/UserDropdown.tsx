import React from "react";
import Dropdown from "@/components/Global/Dropdown";
import { useUser } from "@/context/AuthContext";
import { useMenuOptions } from "@/hooks/useOptions";
import { AlignLeft } from "lucide-react";

const UserDropdown = () => {
  const { logout } = useUser();
  const options = useMenuOptions(logout);

  return (
    <div className="hidden lg:block hover:cursor-pointer">
      <Dropdown
        Icon={AlignLeft}
        options={options}
        iconClass="h-8 w-8 text-icon hover:text-threads transition-all duration-500"
        position="top"
      />
    </div>
  );
};

export default UserDropdown;
