import React from "react";
import Link from "next/link";
import ProfilePicture from "../Profile/ProfilePicture";
import Options from "./Options";
import { BProgress } from "@bprogress/core";
import { Heart, MessageCircle, UserRoundPlus } from "lucide-react";
import { AlertInterface } from "@/interfaces/Alert";
import { interval } from "@/lib/date";
import { useRouter } from "next/navigation";

interface Props {
  data: AlertInterface;
}

const Notify: React.FC<Props> = ({ data }) => {
  const { created_at, type, id, user, post } = data;
  const { id: userId, name, pfp } = user;
  const date = interval(created_at);
  const router = useRouter();

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

  function link(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id == "user") return;

    BProgress.start();

    switch (type) {
      case "follow":
        router.push(`/u/${userId}`);
        break;
      case "like":
      case "reply":
        router.push(`/p/${post?.id}`);
        break;
      default:
        break;
    }
  }

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
        <ProfilePicture userId={userId} src={pfp} h={36} w={36} />
        <span className="absolute -right-2 top-5">{displayIcon()}</span>
      </Link>
      <div
        onClick={link}
        className="flex justify-between border-b border-(--border) w-full pb-1"
      >
        <section className="flex flex-col gap-0.5">
          <span className="flex items-center gap-x-1">
            <Link href={`/u/${userId}`}>
              <p id="user" className="font-semibold hover:underline text-sm">
                {name}
              </p>
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
          <Options alertId={id} />
        </section>
      </div>
    </article>
  );
};

export default Notify;
