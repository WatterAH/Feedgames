import React, { useState } from "react";
import Response from "../Response";
import { MessageCircleMore, MessageSquareQuote } from "lucide-react";
import { PostInterface } from "@/interfaces/Post";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";
import { cn } from "@/lib/utils";

interface Props extends PostInterface {}

const ResponseButton: React.FC<Props> = (post) => {
  const { id, responsed } = post;
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (user.id === defaultUser.id) {
      return triggerAlert("cantCreate");
    }

    setOpen(true);
  };

  return (
    <>
      <button
        className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors group"
        onClick={handleOpen}
      >
        <MessageCircleMore
          className={cn("group-hover:scale-110 transition-transform")}
          size={18}
        />
        <span className="text-xs">{responsed}</span>
      </button>
      <Response open={open} setOpen={setOpen} data={post} parentId={id} />
    </>
  );
};

export default ResponseButton;
