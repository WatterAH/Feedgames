import React from "react";
import { calculateDate } from "@/functions/date";
import { Notification } from "@/interfaces/Notification";
import { Ellipsis, Heart, MessageCircle, UserRoundPlus } from "lucide-react";
import Dropdown from "../Global/Dropdown";
import { useNotifyOptions } from "@/hooks/useOptions";
// import Link from "next/link";

interface Props {
  data: Notification;
  setNotify: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const Notify: React.FC<Props> = ({ data, setNotify }) => {
  const { text, created_at, type, id } = data;
  const classname = "h-10 w-10";
  const date = calculateDate(created_at);
  const options = useNotifyOptions(id, setNotify);
  const icons = [
    <Heart key={0} className={`${classname} text-red-400`} />,
    <MessageCircle key={1} className={`${classname} text-cyan-300`} />,
    <UserRoundPlus key={2} className={`${classname} text-teal-300`} />,
  ];

  return (
    // <Link href={`/${content}/${id_linked}`}>
    <div className="flex w-full border-b p-4 items-center justify-between">
      <div className="flex items-center gap-x-3">
        <div>{icons[type]}</div>
        <section className="flex flex-col">
          <p className="text-icon text-sm">{date}</p>
          <p className="text-threads text-sm md:text-base">{text}</p>
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
