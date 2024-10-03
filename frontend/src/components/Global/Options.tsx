import React, { Fragment, ReactNode } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Home } from "lucide-react";
import { stopPropagation } from "@/functions/utils";

export interface Option {
  icon: ReactNode;
  href?: string;
  onClick: () => void;
  label: string;
}

interface Props {
  Icon_options: typeof Home;
  className: string;
  options: (Option | null)[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Options: React.FC<Props> = ({ Icon_options, className, options }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div onClick={stopPropagation} className="">
        <MenuButton className=" gap-x-1.5 hover:bg-[#efefef] transition-all duration-500 rounded-full flex items-center justify-center h-8 w-8">
          <Icon_options aria-hidden="true" className={className} />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) =>
              option != null ? (
                <MenuItem key={index}>
                  {({ focus }) => (
                    <a
                      className={classNames(
                        focus ? "bg-gray-100" : "",
                        "flex items-center gap-x-2 px-4 py-2 hover:cursor-pointer"
                      )}
                      href={option.href}
                      onClick={option.onClick}
                    >
                      {option.icon}
                      <span className="text-gray-700 text-sm">
                        {option.label}
                      </span>
                    </a>
                  )}
                </MenuItem>
              ) : null
            )}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Options;
