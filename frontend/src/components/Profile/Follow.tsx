import React, { useState } from "react";
import Edit from "./Edit/Edit";
import { useUser } from "@/context/AuthContext";
import { defaultUser, User } from "@/interfaces/User";
import { unFollowUser, followUser } from "@/routes/interactions";
import { toast } from "sonner";
import { useAuthReminder } from "@/context/AuthReminderProvider";

interface Props {
  data: User;
}

const Follow: React.FC<Props> = (props) => {
  const { id, follow } = props.data;
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();
  const isSameUser = user.id === id;
  const [editing, setEditing] = useState(false);
  const [followState, setFollowState] = useState(isSameUser ? true : follow);

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (user.id === defaultUser.id) {
      return triggerAlert("cantFollow");
    }

    try {
      setFollowState(!followState);
      if (!followState) {
        await followUser(user.id, id, user.username);
      } else {
        await unFollowUser(user.id, id, user.username);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={isSameUser ? () => setEditing(true) : handleFollow}
        className={`p-2 h-9 text-sm flex justify-center items-center outline-none ${
          followState
            ? "bg-foreground border border-border text-text"
            : "bg-text text-foreground"
        } rounded-xl w-full font-semibold active:scale-90 transition-all duration-300`}
      >
        {isSameUser ? "Editar perfil" : followState ? "Siguiendo" : "Seguir"}
      </button>

      <Edit data={props.data} open={editing} setOpen={setEditing} />
    </>
  );
};

export default Follow;
