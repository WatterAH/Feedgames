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
  const goProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/u/${userId}`);
  };

  return (
    <Link href={`/${content}/${id_linked}`}>
      <div className="flex w-full border-b border-border p-4 items-center justify-between text-text">
        <div className="flex items-center gap-x-3">
          <button onClick={goProfile}>
            <ProfilePicture src={pfp} h={36} w={36} />
          </button>
          <section className="flex flex-col">
            <span className="flex items-center gap-x-1">
              <button onClick={goProfile}>
                <p className="font-semibold hover:underline text-sm">
                  {username}
                </p>
              </button>
              <p className="text-icon text-xs">{date}</p>
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
    </Link>
  );
};

export default Notify;
