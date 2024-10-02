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

  return (
    <Link href={href}>
      <li className="p-3 rounded-md transition-all duration-150">
        <Icon
          className={`h-6 w-6 lg:h-8 lg:w-8 hover:text-gray-500 ${
            isCurrentPage ? "text-threads" : "text-icon"
          }`}
        />
      </li>
    </Link>
  );
};

export default Item;
