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
