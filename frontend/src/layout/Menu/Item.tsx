import Link from "next/link";
import React from "react";
import { House } from "lucide-react";

interface Props {
  href: string;
  Icon: typeof House;
  currentPathname: string;
}

const Item: React.FC<Props> = ({ href, Icon, currentPathname }) => {
  const isCurrentPage = currentPathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCurrentPage) e.preventDefault();
  };

  return (
    <Link href={href} onClick={handleClick}>
      <li className="px-3 py-2 rounded-md transition-all duration-500 ease-out lg:hover:bg-[#0000000a] active:scale-75">
        <Icon
          className={`h-6 w-6 lg:h-8 lg:w-8 ${
            isCurrentPage
              ? "text-threads dark:text-white"
              : "text-icon dark:text-threads"
          }`}
        />
      </li>
    </Link>
  );
};

export default Item;
