import React, { useState } from "react";
import Response from "../Response";
import { MessageSquareQuote } from "lucide-react";
import { PostInterface } from "@/interfaces/Post";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";

interface Props {
  data: PostInterface;
}

const ResponseButton: React.FC<Props> = ({ data }) => {
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (user.id === defaultUser.id) {
      return triggerAlert("cantCreate");
    }

    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="active:scale-75 transition-transform"
      >
        <MessageSquareQuote
          aria-hidden="true"
          className="h-5 w-5 text-cyan-500"
        />
      </button>
      <Response open={open} setOpen={setOpen} data={data} parentId={data.id} />
    </>
  );
};

export default ResponseButton;
