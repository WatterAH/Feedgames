import Link from "next/link";
import React from "react";
import { BProgress } from "@bprogress/core";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { useRouter } from "next/navigation";

interface Props {
  href: string;
  Icon: typeof House;
  currentPath: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  showBadge?: boolean;
}

const Item: React.FC<Props> = ({
  href,
  Icon,
  currentPath,
  onClick,
  showBadge,
}) => {
  const { user } = useUser();
  const logged = user.id !== defaultUser.id;
  const blocked = ["/me", "/alerts", "/party", ""].includes(href);
  const isCurrentPage = !!href && currentPath.includes(href);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCurrentPage) e.preventDefault();

    if (blocked || !logged) {
      e.preventDefault();
      if (onClick) {
        return onClick(e);
      } else {
        BProgress.start();
        router.push(href);
      }
    }
  };

  return (
    <Link
      className="relative"
      href={logged || !blocked ? href : ""}
      onClick={handleClick}
    >
      <li className="px-4 py-2 rounded-2xl transition-all duration-500 ease-out lg:hover:bg-(--hover) active:scale-75">
        <Icon
          className={cn(
            "duration-500 h-6 w-6 lg:h-8 lg:w-8",
            isCurrentPage ? "text-(--text)" : "text-(--menu-icon)",
          )}
        />
      </li>
      {showBadge && (
        <div className="absolute z-20 right-2 top-1 bg-red-500 h-4 w-4 rounded-full" />
      )}
    </Link>
  );
};

export default Item;
