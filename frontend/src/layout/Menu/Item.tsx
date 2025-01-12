import Link from "next/link";
import React, { useState } from "react";
import { House } from "lucide-react";
import DialogComponent from "@/components/Global/Dialog";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { alerts } from "@/constants/alerts";

interface Props {
  href: string;
  Icon: typeof House;
  currentPathname: string;
}

const Item: React.FC<Props> = ({ href, Icon, currentPathname }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const alert = href == "/notify" ? alerts.cantNotify : alerts.cantProfile;
  const isCurrentPage = currentPathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCurrentPage) e.preventDefault();
    if (href == "/notify" && user.id === defaultUser.id) {
      e.preventDefault();
      setOpen(true);
    } else if (href == "/me" && user.id === defaultUser.id) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
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
      <DialogComponent open={open} setOpen={setOpen} {...alert} />
    </>
  );
};

export default Item;
