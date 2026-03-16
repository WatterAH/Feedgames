import React from "react";
import Link from "next/link";
import Dropdown from "../Global/Dropdown";
import ProfilePicture from "../Profile/ProfilePicture";
import { Ellipsis, Heart, MessageCircle, UserRoundPlus } from "lucide-react";
import { AlertInterface } from "@/interfaces/Alert";
import { interval } from "@/functions/date";
import { useNotifyOptions } from "@/hooks/useOptions";

interface Props {
  data: AlertInterface;
  isLast: boolean;
}

const Notify: React.FC<Props> = ({ data, isLast }) => {
  const { created_at, type, id, user, post } = data;
  const { id: userId, name, pfp } = user;
  const date = interval(created_at);
  const options = useNotifyOptions(id);

  const displaytext = () => {
    if (!post || !post.text) return "";

    const trimmed =
      post.text.length > 150
        ? post.text.substring(0, 150).trim() + "..."
        : post.text;

    return trimmed;
  };

  const displayBadge = () => {
    if (post) return "";

    if (type == "follow") {
      return "Comenzó a seguirte";
    }
  };

  const displayIcon = () => {
    const classBase = "rounded-full w-5 h-5 flex items-center justify-center";
    switch (type) {
      case "follow":
        return (
          <div className={`${classBase} bg-indigo-500`}>
            <UserRoundPlus aria-hidden="true" size={12} fill="#fff" />
          </div>
        );
      case "like":
        return (
          <div className={`${classBase} bg-red-500`}>
            <Heart aria-hidden="true" size={12} fill="#fff" />
          </div>
        );
      case "reply":
        return (
          <div className={`${classBase} bg-cyan-500`}>
            <MessageCircle aria-hidden="true" size={12} fill="#fff" />
          </div>
        );
      default:
        break;
    }
  };

  return (
    <article className="flex flex-row p-4 gap-x-4 text-(--text) hover:cursor-pointer">
      <Link href={`/u/${userId}`} className="relative">
        <ProfilePicture src={pfp} h={36} w={36} />
        <span className="absolute -right-2 top-5">{displayIcon()}</span>
      </Link>
      <div className="flex justify-between border-b border-(--border) w-full pb-1">
        <section className="flex flex-col gap-0.5">
          <span className="flex items-center gap-x-1">
            <Link href={`/u/${userId}`}>
              <p className="font-semibold hover:underline text-sm">{name}</p>
            </Link>
            <p className="text-(--placeholder) text-xs">{date}</p>
          </span>
          <p className="text-(--placeholder) text-sm leading-relaxed">
            {displayBadge()}
          </p>
          <p className="text-(--placeholder) text-sm leading-relaxed">
            {displaytext()}
          </p>
        </section>

        <section>
          <Dropdown
            Icon={Ellipsis}
            options={options}
            position={isLast ? "top_left" : "left"}
            iconClass="text-(--placeholder)"
          />
        </section>
      </div>
    </article>
  );
};

export default Notify;
