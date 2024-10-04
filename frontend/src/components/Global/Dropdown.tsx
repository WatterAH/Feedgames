import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { User } from "lucide-react";
import { stopPropagation } from "@/functions/utils";

interface Props {
  Icon: typeof User;
  iconClass?: string;
  options: ({
    label: string;
    icon?: typeof User;
    color?: string;
    onClick: () => void;
  } | null)[];
  position: "top" | "bottom" | "left" | "right";
}

const Dropdown: React.FC<Props> = ({ Icon, iconClass, options, position }) => {
  const positionClasses = {
    top: "bottom-full mb-1",
    bottom: "top-full mb-1",
    left: "right-0 mt-1",
    right: "left-0 mt-1",
  };

  const originClasses = {
    top: "origin-bottom-left",
    bottom: "origin-top-right",
    left: "origin-top-right",
    right: "origin-top-right",
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div onClick={stopPropagation}>
        <MenuButton className="w-full justify-center gap-x-1.5 p-2 text-threads sm:hover:bg-gray-100 rounded-full transition-all duration-500">
          <Icon className={iconClass} />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className={`absolute ${positionClasses[position]} z-10 w-56 ${originClasses[position]} rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
      >
        <div className="py-2 px-1">
          {options.map((option) => {
            if (option) {
              const Icon = option.icon;
              return (
                <div key={option.label} onClick={stopPropagation}>
                  <MenuItem>
                    <button
                      className="p-4 w-full flex justify-between text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 rounded-2xl"
                      onClick={option.onClick}
                    >
                      {option.label}
                      {Icon && (
                        <Icon
                          className={`${
                            option.color ?? "text-threads"
                          } h-5 w-5`}
                        />
                      )}
                    </button>
                  </MenuItem>
                </div>
              );
            }
          })}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
