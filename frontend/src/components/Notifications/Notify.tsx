import React from "react";
import Link from "next/link";
import Dropdown from "../Global/Dropdown";
import ProfilePicture from "../Profile/ProfilePicture";
import { Ellipsis } from "lucide-react";
import { Notification } from "@/interfaces/Notification";
import { calculateDate } from "@/functions/date";
import { useNotifyOptions } from "@/hooks/useOptions";

interface Props {
  data: Notification;
}

const Notify: React.FC<Props> = ({ data }) => {
  const { text, created_at, id, user } = data;
  const { id: userId, username, pfp } = user;
  const date = calculateDate(created_at);
  const options = useNotifyOptions(id);

  return (
    // <Link href={`/${content}/${id_linked}`}>
    <div className="flex w-full border-b p-4 items-center justify-between">
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
            <p className="text-icon text-sm">{date}</p>
          </span>
          <p className="text-threads text-sm">{text}</p>
        </section>
      </div>
      <section>
        <div>
          <Dropdown
            Icon={Ellipsis}
            options={options}
            position="left"
            iconClass="text-secondaryicon"
          />
        </div>
      </section>
    </div>
    // </Link>
  );
};

export default Notify;
