import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";

interface Props {
  href: string;
  Icon: typeof House;
  currentPath: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Item: React.FC<Props> = ({ href, Icon, currentPath, onClick }) => {
  const { user } = useUser();
  const logged = user.id !== defaultUser.id;
  const blocked = ["/me", "/alerts", ""].includes(href);
  const isCurrentPage = currentPath === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCurrentPage) e.preventDefault();

    if (blocked || !logged) {
      e.preventDefault();
      onClick && onClick(e);
      return;
    }
  };

  return (
    <Link href={logged || !blocked ? href : ""} onClick={handleClick}>
      <li className="px-4 py-2 rounded-2xl transition-all duration-500 ease-out lg:hover:bg-(--hover) active:scale-75">
        <Icon
          className={cn(
            "duration-500 h-6 w-6 lg:h-8 lg:w-8",
            isCurrentPage ? "text-(--text)" : "text-(--menu-icon)",
          )}
        />
      </li>
    </Link>
  );
};

export default Item;
