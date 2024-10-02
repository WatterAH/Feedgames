import { calculateDate } from "@/functions/date";
import { Notification } from "@/interfaces/Notification";
import {
  Heart,
  Mail,
  MailOpen,
  MessageCircle,
  UserRoundPlus,
} from "lucide-react";
import React from "react";

interface Props {
  data: Notification;
}

const Notify: React.FC<Props> = ({ data }) => {
  const { text, created_at, type, read } = data;
  const classname = "text-threads h-10 w-10";
  const date = calculateDate(created_at);
  const icons = [
    <Heart key={0} className={`${classname} text-red-400`} />,
    <MessageCircle key={1} className={`${classname} text-cyan-400`} />,
    <UserRoundPlus key={2} className={`${classname} text-teal-300`} />,
  ];

  return (
    <div className="flex w-full border-b p-4 items-center justify-between">
      <section className="flex items-center gap-x-3">
        {icons[type]}
        <section className="flex flex-col">
          <p className="text-icon text-sm">{date}</p>
          <p className="text-threads">{text}</p>
        </section>
      </section>
      <section>
        {read ? (
          <Mail className="text-threads" />
        ) : (
          <MailOpen className="text-threads" />
        )}
      </section>
    </div>
  );
};

export default Notify;
