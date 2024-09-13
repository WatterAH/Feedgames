import React, { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";

export interface Option {
  icon: ReactNode;
  href?: string;
  onClick: () => void;
  label: string;
}

interface Props {
  Icon_options: typeof UserIcon;
  className: string;
  options: (Option | null)[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Options: React.FC<Props> = ({ Icon_options, className, options }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5">
          <Icon_options aria-hidden="true" className={className} />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:border dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) =>
              option != null ? (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active
                          ? "bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-200"
                          : "text-gray-600 dark:text-gray-200",
                        "flex items-center px-4 py-2 text-sm hover:cursor-pointer"
                      )}
                      href={option.href}
                      onClick={option.onClick}
                    >
                      {option.icon}
                      {option.label}
                    </a>
                  )}
                </Menu.Item>
              ) : null
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Options;
