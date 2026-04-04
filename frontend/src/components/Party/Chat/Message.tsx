import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useUser } from "@/context/AuthContext";
import { Message as MessageInterface } from "@/interfaces/Party";
import ProfilePicture from "@/components/Profile/ProfilePicture";

interface Props extends MessageInterface {
  isFirst: boolean;
}

const Message: React.FC<Props> = (message) => {
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
        className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"} max-w-[75%]`}
      >
        <div
          className={cn("px-4 py-2.5 text-[15px] shadow-sm leading-relaxed", {
            "text-(--foreground) bg-(--text) rounded-2xl rounded-br-sm":
              isOwnMessage,
            "bg-(--foreground) text-gray-100 border border-(--border) rounded-2xl rounded-bl-sm":
              !isOwnMessage,
          })}
        >
          {content}
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
