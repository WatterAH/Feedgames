import React from "react";
import Link from "next/link";
import Dropdown from "../Global/Dropdown";
import ProfilePicture from "../Profile/ProfilePicture";
import { Ellipsis } from "lucide-react";
import { Notification } from "@/interfaces/Notification";
import { calculateDate } from "@/functions/date";
import { useNotifyOptions } from "@/hooks/useOptions";
import { useRouter } from "next/navigation";

interface Props {
  data: Notification;
  isLast: boolean;
}

const Notify: React.FC<Props> = ({ data, isLast }) => {
  const { text, created_at, id, user, content, id_linked } = data;
  const { id: userId, username, pfp } = user;
  const date = calculateDate(created_at);
  const options = useNotifyOptions(id);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${content}/${id_linked}`);
  };

  return (
    <div
      className="flex w-full border-b border-border p-4 items-center justify-between text-text hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-x-3">
        <Link href={`/u/${userId}`}>
          <ProfilePicture src={pfp} h={36} w={36} />
        </Link>
        <section className="flex flex-col">
          <span className="flex items-center gap-x-1">
            <Link href={`/u/${userId}`}>
              <p className="font-semibold hover:underline text-sm">
                {username}
              </p>
            </Link>
            <p className="text-placeholder text-xs">{date}</p>
          </span>
          <p className="text-text text-sm">{text}</p>
        </section>
      </div>
      <section>
        <Dropdown
          Icon={Ellipsis}
          options={options}
          position={isLast ? "top_left" : "left"}
          iconClass="text-placeholder"
        />
      </section>
    </div>
  );
};

export default Notify;
