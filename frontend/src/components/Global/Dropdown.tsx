import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LucideIcon } from "lucide-react";
import { stopPropagation } from "@/functions/utils";

interface Props {
  Icon: LucideIcon;
  iconClass?: string;
  hover?: boolean;
  options: ({
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  } | null)[];
  position: "top" | "top_left" | "left" | "right";
}

const Dropdown: React.FC<Props> = ({
  Icon,
  iconClass,
  options,
  position,
  hover = true,
}) => {
  const positionClasses = {
    top: "bottom-full mb-1",
    top_left: "bottom-1/4 right-full",
    left: "right-0 mt-1",
    right: "left-0 mt-1",
  };

  const originClasses = {
    top: "origin-bottom-left",
    top_left: "origin-bottom-right",
    left: "origin-top-right",
    right: "origin-top-right",
  };

  return (
    <Menu as="div" className="relative text-left" onClick={stopPropagation}>
      <div onClick={stopPropagation}>
        <MenuButton
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-full p-2 text-threads ${
            hover ? "sm:hover:bg-hover" : ""
          } transition-all duration-300 active:scale-75`}
        >
          <Icon className={iconClass} />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className={`absolute z-30 ${positionClasses[position]} w-56 ${originClasses[position]} rounded-2xl bg-foreground border border-border shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
      >
        <div className="py-2 px-1">
          {options.map((option) => {
            if (option) {
              const Icon = option.icon;
              return (
                <div
                  key={option.label}
                  onClick={stopPropagation}
                  className="overflow-y-hidden"
                >
                  <MenuItem>
                    <button
                      className="p-4 w-full flex justify-between text-sm font-semibold text-text data-[focus]:bg-hover rounded-2xl"
                      onClick={option.onClick}
                    >
                      {option.label}
                      {Icon && <Icon className={"text-text h-5 w-5"} />}
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
