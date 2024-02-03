import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Option {
  onClick: () => void;
  icon: IconProp;
  textColor: string;
  label: string;
}

interface Props {
  icon_options: IconProp;
  className?: string;
  options: Option[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Options: React.FC<Props> = ({
  icon_options,
  className,
  options,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5">
          <FontAwesomeIcon icon={icon_options} className={className} />
        </Menu.Button>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-600" : "text-gray-600",
                      "block px-4 py-2 text-sm hover:cursor-pointer"
                    )}
                    onClick={option.onClick}
                  >
                    <FontAwesomeIcon
                      icon={option.icon}
                      className={`mr-2 ${option.textColor}`}
                    />
                    {option.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
