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
      <li className="hover:bg-gray-100 p-3 rounded-md transition-all duration-150">
        <Icon
          className={`h-8 w-8 ${
            isCurrentPage ? "text-[#101010]" : "text-[#ccc]"
          }`}
        />
      </li>
    </Link>
  );
};

export default Item;
