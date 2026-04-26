import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useUser } from "@/context/AuthContext";
import { Message as MessageInterface } from "@/interfaces/Party";
import ProfilePicture from "@/components/Profile/ProfilePicture";
import { AlertTriangle } from "lucide-react";

interface Props extends MessageInterface {
  isFirst: boolean;
  warning_overlay?: string;
}

const Message: React.FC<Props> = ({ warning_overlay, ...message }) => {
  const { user: session } = useUser();
  const { content, user_id, user, created_at, type, isFirst } = message;
  const isOwnMessage = user_id === session.id;

  if (type == "system") {
    return (
      <div className="px-4 py-2.5 text-sm text-(--placeholder) mx-auto w-fit">
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full px-4 mt-1",
        isOwnMessage ? "justify-end" : "justify-start",
      )}
    >
      {!isOwnMessage && (
        <div className="w-8 mr-2 shrink-0 flex items-end">
          {isFirst && (
            <div className="w-8 h-8 rounded-full mb-5">
              <ProfilePicture h={32} w={32} src={user.pfp} userId={user.id} />
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[75%]",
          isOwnMessage ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "px-4 py-2.5 text-[15px] shadow-sm leading-relaxed overflow-hidden",
            {
              "text-(--foreground) bg-(--text) rounded-2xl rounded-br-sm":
                isOwnMessage,
              "bg-(--foreground) text-gray-100 border border-(--border) rounded-2xl rounded-bl-sm":
                !isOwnMessage,
            },
          )}
        >
          {warning_overlay && (
            <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[12px] font-medium">
              <AlertTriangle size={14} className="shrink-0" />
              <span>{warning_overlay}</span>
            </div>
          )}

          <div className={cn(warning_overlay && "opacity-90")}>{content}</div>
        </div>

        {isFirst && (
          <span className="text-xs text-zinc-500 mt-1 px-1">
            {format(created_at, "HH:mm")}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
