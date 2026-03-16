import Link from "next/link";
import React from "react";
import { House } from "lucide-react";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";

interface Props {
  href: string;
  Icon: typeof House;
  currentPath: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Item: React.FC<Props> = ({ href, Icon, currentPath, onClick }) => {
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const isCurrentPage = currentPath === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCurrentPage) e.preventDefault();
    if (href == "/notify" && user.id === defaultUser.id) {
      e.preventDefault();
      return triggerAlert("cantNotify");
    } else if (href == "/me" && user.id === defaultUser.id) {
      e.preventDefault();
      return triggerAlert("cantMe");
    }

    if (onClick) {
      if (href == "") {
        e.preventDefault();
      }
      onClick(e);
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <li className="px-4 py-2 rounded-2xl transition-all duration-500 ease-out lg:hover:bg-hover active:scale-75">
        <Icon
          className={`duration-500 h-6 w-6 lg:h-8 lg:w-8 ${
            isCurrentPage ? "text-text" : "text-menu-icon"
          }`}
        />
      </li>
    </Link>
  );
};

export default Item;
